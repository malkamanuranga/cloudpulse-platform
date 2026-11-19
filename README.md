# cloudpulse-platform

Node API with Prometheus metrics, built by CI, published to Docker Hub and
deployed to AWS with Terraform and Jenkins. Monitored with Prometheus and Grafana.

Status: in progress. Measured results are in docs/MEASUREMENTS.md.

## Run the published image

    docker run -p 3000:3000 malkamanuranga/cloudpulse-api:latest
    curl http://localhost:3000/healthz
