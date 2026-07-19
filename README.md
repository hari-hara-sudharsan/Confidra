# Confidra: Confidential Decision Infrastructure

**Confidra** is an enterprise-grade SaaS platform built on the **Flare Network**. It provides organizations with a cryptographically secure, privacy-preserving infrastructure for executing sensitive AI decision workflows. By leveraging Flare Confidential Compute and a custom 14-Agent AI DAG architecture, Confidra ensures that your most sensitive data is never exposed on-chain, while still providing absolute verifiability through on-chain cryptographic attestations.

## Architecture Highlights
- **Frontend**: Next.js 14 App Router, Tailwind CSS, Lucide Icons.
- **Backend API**: NestJS, PostgreSQL (Prisma), JWT Authentication, Helmet/RateLimiting.
- **TEE AI Engine**: FastAPI (Python), 14-Agent DAG Pipeline, LLM integrations.
- **Blockchain Trust Layer**: Hardhat, Solidity Smart Contracts deployed to Flare Testnet.

## Quickstart (Docker Compose)

The easiest way to spin up the entire Confidra stack locally is using Docker Compose.

1. Ensure Docker and Docker Compose are installed.
2. Clone the repository and navigate to the root directory.
3. Configure your environment variables (see `docs/operations-guide.md`).
4. Run the stack:
```bash
docker-compose up --build
```
This will start the PostgreSQL database, the Python TEE Enclave worker on port `8000`, the NestJS API Gateway on port `3001`, and the Next.js Frontend on port `3000`.

## Documentation
- **[Architecture Details](./docs/architecture.md)**
- **[API Reference](./docs/api-reference.md)**
- **[Developer Guide (Local Setup)](./docs/developer-guide.md)**
- **[Operations Guide & Runbook](./docs/operations-guide.md)**
- **[Release Checklist](./docs/release-checklist.md)**

## CI/CD Pipeline
Confidra is equipped with a robust GitHub Actions pipeline (`.github/workflows/ci-cd.yml`) that automatically lints, tests, builds the smart contracts, and builds the production multi-stage Docker images on every push to the `main` branch.

## Security
Confidra employs OWASP best practices including:
- Helmet headers (`X-Frame-Options`, `Strict-Transport-Security`, etc.)
- CORS validation
- Throttler rate-limiting on the API gateway
- Strict global validation pipes (input sanitization)
- Local AES-256-GCM encryption before routing payloads to the TEE enclave.

## License
Confidra is open-source and built for the Flare Summer Signal hackathon.
