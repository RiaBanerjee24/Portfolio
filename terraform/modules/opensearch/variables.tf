variable "cluster_name" {
  type = string
}

variable "master_password" {
  type      = string
  sensitive = true
}

variable "environment" {
  type = string
}