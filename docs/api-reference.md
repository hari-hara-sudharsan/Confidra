# Confidra API Reference

The Confidra REST API is built on NestJS and secured via JWT. 

## Base URL
`http://localhost:3001/api/v1`

## Authentication
`POST /auth/login`
- Body: `{ email, password }`
- Returns: `{ accessToken, user }`

## Workflows
`GET /workflows`
- Headers: `Authorization: Bearer <token>`
- Returns: List of active workflows for the user's organization.

`POST /workflows`
- Body: `{ name, description, policies }`
- Returns: Created workflow object.

## Executions (Confidential TEE Routing)
`POST /executions`
- Body: `{ workflowId, payload }`
- Action: Encrypts the payload, sends to the TEE worker, and records the attestation.
- Returns: `{ executionId, txHash }`

`GET /executions/:id`
- Returns: Decrypted results, AI metrics, and ECDSA signature.

## Analytics & Health
`GET /analytics/dashboard`
- Returns: Aggregated execution metrics and risk distribution charts.

`GET /health`
- Returns: Real-time status of Postgres, TEE Worker, and Flare RPC.
