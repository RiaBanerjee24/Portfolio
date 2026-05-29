variable "cluster_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "node_instance_type" {
  type = string
}

variable "monitoring_instance_type" {
  type = string
}

variable "node_role_arn" {
  type = string
}

variable "cluster_role_arn" {
  type = string
}

variable "environment" {
  type = string
}