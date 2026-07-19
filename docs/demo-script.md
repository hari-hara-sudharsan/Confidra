# Confidra: 3-Minute Demo Script

**Speaker Note:** Keep the pace energetic. Emphasize the "Flare paradox solution": Privacy + Auditability.

## [0:00 - 0:30] The Problem
"Hello judges, we are building Confidra. Every enterprise wants to use AI to speed up workflows like hiring, vendor procurement, and loan approvals. But there is a massive problem: they legally cannot send sensitive PII to cloud LLMs. Confidra solves this using Flare Confidential Compute."

## [0:30 - 1:15] The Demo Control Center
*(Navigate to `/demo`)*
"Let's look at a live example: A University Scholarship Review. We need to evaluate a student's financial records without exposing their identity.
I click 'Run Scenario'. The data is encrypted locally and sent directly into a Flare TEE (Trusted Execution Environment)."

## [1:15 - 2:00] Confidential AI Execution
*(Navigate to `/executions/demo-123`)*
"Notice what just happened. The AI evaluated the payload *inside* the hardware enclave. Even as the platform administrators, we cannot see the raw input data. But look at our AI Copilot on the right—it generated a human-readable explanation, policy citations, and a confidence score. We get the intelligence without compromising the data."

## [2:00 - 2:30] The Trust Certificate
*(Navigate to `/trust-dashboard`)*
"But how do we prove the AI followed the rules? Because the TEE anchors a cryptographic hash of this exact execution directly to the Flare EVM blockchain. We've generated an immutable Trust Certificate. Auditors can verify the decision was fair, without ever seeing the student's PII."

## [2:30 - 3:00] The Ecosystem Vision
*(Navigate to `/marketplace` then `/judge`)*
"Confidra isn't just an app; it's infrastructure. We've built a full Marketplace for sharing workflows, and a Plugin architecture for enterprise integration. You can explore everything from our dedicated Judge Dashboard. Thank you for your time."
