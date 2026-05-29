output "node_role_arn" {
  value = aws_iam_role.node_role.arn
}

output "node_role_name" {
  value = aws_iam_role.node_role.name
}

output "cluster_role_arn" {
  value = aws_iam_role.cluster_role.arn
}

output "alb_controller_policy_arn" {
  value = aws_iam_policy.alb_controller.arn
}

output "cluster_autoscaler_policy_arn" {
  value = aws_iam_policy.cluster_autoscaler.arn
}