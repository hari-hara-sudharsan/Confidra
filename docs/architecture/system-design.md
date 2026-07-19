# Confidra System Architecture

## Core Components

1. **Frontend (Next.js App Router)**
   - Responsible for rendering the Enterprise Dashboard, Workflow Marketplace, and Judge Showcase experiences.
   - Built with Tailwind CSS and Lucide Icons for rapid, high-fidelity UI.

2. **Backend (NestJS Microservices)**
   - Acts as the orchestration layer between the enterprise user and the Flare network.
   - Modules include: `AiModule`, `EcosystemModule`, `TrustModule`, `BlockchainModule`, and `SecurityModule`.

3. **Confidential AI Enclave (Simulated)**
   - Represents the hardware Trusted Execution Environment (TEE).
   - In production, this layer runs on isolated Flare nodes where the host OS cannot inspect memory. The backend currently simulates this boundary perfectly for hackathon evaluation.

4. **Flare EVM (The Trust Anchor)**
   - The ultimate source of truth. Once the TEE evaluates a payload, it signs a cryptographic proof of the decision and anchors it to a smart contract on the Flare blockchain, establishing an immutable Trust Certificate.
