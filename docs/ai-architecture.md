# Confidra Confidential AI Architecture

Confidra leverages AI not just as an assistant, but as the core reasoning engine evaluated securely within the **Flare Confidential Compute** TEE. This document outlines our AI capabilities.

## 1. AI Studio & Workflow Generation
The **AI Studio** allows users to map out complex governance policies using natural language (e.g., "Create a scholarship evaluation workflow"). The backend `AiService` orchestrates the translation of these natural language rules into structured JSON configurations (stages, risk policies, thresholds) ready to be deployed into the TEE.

## 2. Decision Explainability
Every time the AI evaluates a confidential payload inside the TEE, it generates an explanation payload containing:
- Human-readable Reasoning Summary
- Confidence Scores
- Identified Risk Factors
- Explicit Policy Citations

This is surfaced contextually to human reviewers via the **Decision Copilot**, ensuring AI reasoning is fully auditable.

## 3. Prompt Governance
Because prompts are effectively the "code" guiding our AI engine, Confidra tracks prompt versions identically to software deployments. Organizations can trace exactly which prompt evaluated a specific execution and roll back to previous versions if accuracy degrades.

## 4. AI Quality Center & Simulation
- **AI Quality Center**: Tracks metrics such as Human Agreement Rate, False Positives, and Confidence Calibration over time.
- **Simulation Engine**: Enables administrators to route synthetic datasets through new policy thresholds before pushing them to production, mitigating deployment risks.
