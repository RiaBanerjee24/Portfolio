terraform {
  backend "s3" {
    bucket         = "portfolio-terraform-state-535002893779"
    key            = "portfolio/terraform.tfstate"
    region         = "us-east-1"
    use_lockfile   = true
    encrypt        = true
  }
}