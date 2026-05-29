terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# These providers need the cluster to exist first
# They use the EKS cluster output to configure themselves
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_ca_certificate)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_ca_certificate)
    token                  = data.aws_eks_cluster_auth.cluster.token
  }
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

# ── Modules ──────────────────────────────────────────────

module "vpc" {
  source = "./modules/vpc"

  cluster_name       = var.cluster_name
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  environment        = var.environment
}

module "iam" {
  source = "./modules/iam"

  cluster_name = var.cluster_name
  aws_region   = var.aws_region
  account_id   = data.aws_caller_identity.current.account_id
}

module "eks" {
  source = "./modules/eks"

  cluster_name             = var.cluster_name
  vpc_id                   = module.vpc.vpc_id
  private_subnet_ids       = module.vpc.private_subnet_ids
  node_instance_type       = var.node_instance_type
  monitoring_instance_type = var.monitoring_instance_type
  cluster_role_arn         = module.iam.cluster_role_arn
  node_role_arn            = module.iam.node_role_arn
  environment              = var.environment

  depends_on = [module.vpc, module.iam]
}

module "opensearch" {
  source = "./modules/opensearch"

  cluster_name    = var.cluster_name
  master_password = var.opensearch_master_password
  environment     = var.environment

  depends_on = [module.eks]
}

data "aws_caller_identity" "current" {}