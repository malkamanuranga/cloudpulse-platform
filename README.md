# cloudpulse-platform

Node API with Prometheus metrics, built by CI, published to Docker Hub and
deployed to AWS with Terraform and Jenkins. Monitored with Prometheus and Grafana.

Status: in progress. Measured results are in docs/MEASUREMENTS.md.

## Run the published image

    docker run -p 3000:3000 malkamanuranga/cloudpulse-api:latest
    curl http://localhost:3000/healthz

## Repository layout
- src/ and tests/: Node API with health and Prometheus metrics
- k8s/: Kustomize base and dev/prod overlays
- gitops/argocd/: ArgoCD project and applications
- policies/: Kyverno policies
- observability/: ServiceMonitor, alerts, SLO rules, local Prometheus
- infra/: Terraform (remote state bootstrap, VPC module, dev environment)
- docs/: architecture, ADRs, runbooks, postmortem template

## Local development
make install, make test, make up, make load
