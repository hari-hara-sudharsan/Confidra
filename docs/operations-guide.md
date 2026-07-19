# Operations Guide & Runbook

This document outlines the operational environment and troubleshooting steps for maintaining the Confidra platform in production.

## 1. Environment Variable Management

To securely operate the Confidra stack, the following secrets and configuration variables must be injected into the environment (or stored securely in a Vault/Secret Manager).

### Backend (`apps/backend/.env`)
```env
# Database
DATABASE_URL="postgresql://confidra:confidra_password@localhost:5432/confidra_db?schema=public"

# Security
JWT_SECRET="generate-a-secure-random-256-bit-key"
PORT=3001

# Services
TEE_URL="http://localhost:8000"
FRONTEND_URL="http://localhost:3000"
```

### TEE Worker (`apps/tee-worker/.env`)
```env
# AI Models
OPENAI_API_KEY="sk-..."
```

### Blockchain (`blockchain/.env`)
```env
# Deployment
FLARE_TESTNET_URL="https://coston2-api.flare.network/ext/bc/C/rpc"
PRIVATE_KEY="your-deployer-wallet-private-key"
```

---

## 2. Troubleshooting Runbook

### Issue: Backend cannot connect to Database
- **Symptoms**: 500 Errors on the frontend; logs show `PrismaClientInitializationError`.
- **Resolution**:
  1. Verify the `DATABASE_URL` is correct.
  2. If using Docker Compose, ensure the `database` service is healthy.
  3. Run `npx prisma db push` to ensure the schema is applied.

### Issue: TEE Execution Fails / Latency Spikes
- **Symptoms**: Workflows hang in "Processing" state; `apps/tee-worker` logs show timeouts.
- **Resolution**:
  1. Verify `OPENAI_API_KEY` is valid and not rate-limited.
  2. Check the System Health dashboard (`/health`). If TEE latency > 5000ms, consider scaling the `tee-worker` container horizontally.

### Issue: Smart Contract Deployment Fails
- **Symptoms**: Hardhat errors out with `insufficient funds`.
- **Resolution**:
  1. Ensure the deployer wallet (`PRIVATE_KEY`) is funded with testnet CFLR via the Flare faucet.
  2. Verify network configuration in `hardhat.config.ts`.
