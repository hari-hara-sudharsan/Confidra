# Confidra System Architecture

Confidra is built as a highly secure, privacy-preserving microservices monorepo designed specifically to bridge traditional Web2 SaaS with Web3 Confidential Computing.

## Core Modules

### 1. Frontend Client (`apps/frontend`)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Role**: Provides the unified Executive Dashboard, Workflow Builder, and Audit Center. Connects securely via JWT to the Backend API.

### 2. Backend API (`apps/backend`)
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL (via Prisma ORM)
- **Role**: Handles Identity (Organizations, Users), securely routes payloads to the TEE, and monitors Execution Logs and Analytics.
- **Security**: AES-256-GCM encryption is applied to all sensitive payload data before it leaves the backend.

### 3. TEE AI Worker (`apps/tee-worker`)
- **Framework**: FastAPI (Python)
- **Role**: Simulates the Flare Confidential Compute enclave. It receives encrypted payloads, decrypts them in memory, executes a 14-Agent AI DAG using OpenAI/Local LLMs, and outputs a cryptographically signed execution hash (ECDSA).

### 4. Smart Contracts (`blockchain`)
- **Framework**: Hardhat (Solidity)
- **Role**: The On-Chain Trust Layer deployed to the Flare Testnet. It stores non-sensitive Execution Hashes, Policy Hashes, and verifies TEE signatures to provide absolute public auditability without compromising private data.

## Data Flow
1. User submits a confidential application via the Frontend.
2. Backend encrypts the data and forwards it to the TEE Worker.
3. TEE Worker decrypts data, runs AI analysis, generates a result, and creates an ECDSA signature over the result hash.
4. TEE returns the encrypted result and the signature to the Backend.
5. Backend stores the execution log and anchors the signature to the `ConfidentialExecutionRegistry` smart contract on Flare.
