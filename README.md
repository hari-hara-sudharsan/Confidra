# Confidra

Confidential Decision Infrastructure powered by Flare Confidential Compute.

## Monorepo Structure
- `apps/frontend`: Next.js 15 Web Application
- `apps/backend`: NestJS API Gateway and Core Logic
- `packages/*`: Shared utilities, types, and UI components
- `blockchain/`: Hardhat workspace for Solidity contracts
- `services/`: Python FastAPI services for TEE and AI logic
- `database/`: Prisma ORM configuration

## Getting Started
1. Run `npm install` at the root.
2. Setup environment variables by copying `.env.example` to `.env`.
3. Run `npm run dev` to start all applications.
