# Runbook: CloudpulseApiDown / CrashLooping

- Severity: SEV1 (down) or SEV2 (crash looping)

## Symptoms
Alert CloudpulseApiDown or CloudpulseApiCrashLooping fires.

## Diagnosis
1. kubectl get pods -n cloudpulse-prod
2. kubectl describe pod <pod> -n cloudpulse-prod
3. kubectl logs deploy/cloudpulse-api -n cloudpulse-prod --tail=100
4. Check whether a new image was rolled out: kubectl rollout history deploy/cloudpulse-api -n cloudpulse-prod

## Mitigation
- Bad release: kubectl rollout undo deploy/cloudpulse-api -n cloudpulse-prod
- Not enough capacity: check HPA with kubectl get hpa -n cloudpulse-prod
- Out of memory: check for OOMKilled in describe output and raise the memory limit

## Escalation
Page the service owner if not resolved in 15 minutes.

## Follow-up
- [ ] Open a postmortem
- [ ] Tune the alert if it was noisy
