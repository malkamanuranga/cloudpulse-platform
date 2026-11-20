# ADR-0002: Kustomize overlays instead of Helm

- Status: Accepted

## Context
We deploy one service to dev and prod with small differences (replicas,
namespace, image tag).

## Decision
Use a Kustomize base with one overlay per environment, applied by ArgoCD.

## Consequences
- (+) Plain YAML, easy to review in pull requests
- (+) No templating language to maintain
- (-) Less reuse than a Helm chart if more services are added later

## Alternatives considered
- Helm: better for packaging and many services, heavier for a single service
