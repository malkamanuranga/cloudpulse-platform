terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "../../modules/vpc"

  name = "cloudpulse-dev"
  cidr = "10.10.0.0/16"
  azs  = ["us-east-1a", "us-east-1b"]
  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
