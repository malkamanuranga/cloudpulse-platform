# Measurements

Measured with docker images on my machine.

| Image | Size |
|---|---|
| single-stage node:20 | 1.68GB |
| multi-stage alpine, non-root | 205MB |

Vulnerabilities (HIGH and CRITICAL, fix available), scanned with Trivy on 2026-11-19:

| Image | Vulnerabilities |
|---|---|
| single-stage node:20 | 1403 |
| multi-stage alpine, non-root | 29 |
