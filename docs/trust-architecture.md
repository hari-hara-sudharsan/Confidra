# Confidra Trust Architecture

To establish Confidra as the world's most trusted decision infrastructure, every confidential execution generates a mathematically verifiable **Trust Certificate**.

This document outlines the cryptographic design.

## Certificate Engine

When an execution completes, the TEE Enclave returns a payload containing:
- The `decisionHash` (representing the output).
- The `executionHash` (representing the input data and AI weights).
- An ECDSA signature over the execution hash.

Confidra then submits this signature to the **Verification Registry Smart Contract** on the Flare Network, yielding a `blockchainTxHash`.

Finally, the backend aggregates these artifacts into a single JSON object.

## Cryptographic Design

To ensure tamper-resistance:
1. **Integrity Hash**: We perform a SHA-256 hash over the entire JSON object to generate a deterministic identifier.
2. **Platform Signature**: The integrity hash is then signed using Confidra's root KMS private key (via HMAC or ECDSA) to produce the `platformSignature`.

## Public Verification

Auditors do not need an account to verify an execution. They can access the public `/v1/trust/verify/:id` endpoint.
The API recalculates the SHA-256 integrity hash. If any byte of the data has changed, the hash will not match, and the verification will immediately fail.

This guarantees that:
- The AI evaluation occurred inside a secure enclave.
- The outcome was anchored on a decentralized ledger (Flare).
- Confidra officially attests to the lineage.
