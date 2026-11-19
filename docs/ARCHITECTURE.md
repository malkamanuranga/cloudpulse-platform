# Architecture (target design, in progress)

- GitHub Actions: lint, test, build, scan and push the image to Docker Hub.
- Terraform: one small EC2 server with a security group in the default VPC.
- Jenkins: deploys the new image to the server over SSH.
- Docker Compose on the server: API, Prometheus and Grafana.
- Prometheus scrapes /metrics from the API. Grafana shows the dashboards.

Cost rule: one small instance, no NAT gateway, no load balancer. Destroy when done.
