# Confidra: Confidential Decision Infrastructure

**A submission for the Flare Summer Signal Hackathon.**

## 1. Project Description
Confidra is an enterprise-grade SaaS platform that uses **Flare Confidential Compute** to solve the paradox of AI adoption in highly regulated industries. Organizations want the power of AI to evaluate workflows (like hiring, lending, or procurement), but they cannot legally or ethically expose PII (Personally Identifiable Information) to cloud LLMs.

Confidra encrypts data locally, evaluates it using AI strictly inside a hardware Trusted Execution Environment (TEE), and anchors a mathematical proof of that decision to the Flare blockchain—guaranteeing 100% privacy and 100% auditability.

## 2. Target Users
- **Universities:** Evaluating financial aid confidentially.
- **Enterprise Procurement:** Scoring vendor bids anonymously to prevent bias.
- **DAOs:** Evaluating grant applications without doxxing applicants.
- **HR Departments:** Running initial resume screens without exposing candidate names/demographics.

## 3. The Flare Integration
Flare is not an optional add-on for Confidra; it is the foundational trust layer:
1. **Confidential Compute:** All AI evaluation logic runs inside the Flare TEE. Even we, the developers, cannot see the data being processed.
2. **Immutable Audit Trails:** When a decision is reached, a lightweight cryptographic proof (Trust Certificate) is anchored to the Flare EVM, allowing third-party auditors to verify that a specific policy was followed without ever seeing the underlying raw data.

## 4. Technical Highlights
- **Full Stack Architecture:** Next.js (App Router) Frontend + NestJS Microservices Backend.
- **Simulated TEE Enclave:** A dedicated backend service architecture that successfully mocks the isolation and cryptographic signing of a hardware enclave for demo purposes.
- **Ecosystem Ready:** Built with a Workflow Marketplace and Enterprise Plugin architecture from Day 1.

## 5. Deployment Instructions
Confidra is structured as a Turborepo monorepo.
```bash
git clone https://github.com/hari-hara-sudharsan/Confidra.git
cd Confidra
npm install
npm run dev
```
Navigate to `http://localhost:3000/judge` to access the dedicated Judge Dashboard.
