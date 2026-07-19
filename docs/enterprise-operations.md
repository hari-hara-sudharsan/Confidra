# Confidra Enterprise Operations

Confidra provides industry-leading operational excellence. This guide documents the telemetry, security, and administrative capabilities built into the platform.

## Executive Command Center
The **Command Center** aggregates the most critical system health parameters. It visualizes:
- TEE Enclave Execution Latency
- System Throughput (Requests / sec)
- Flare Blockchain Confirmation speeds
- Real-time Active Enclaves

## Security Operations Center (SOC)
Confidra monitors all authentication attempts, API key creations, and administrative role modifications. 
- **Threat Detection**: The SOC automatically flags anomalous activity (e.g., 5+ failed logins within an hour).
- **Audit Feed**: Every organization event is captured in an immutable audit feed to ensure compliance with enterprise regulations (e.g., SOC2, HIPAA).

## Universal Command Palette
Administrators can navigate the entire Confidra SaaS platform instantaneously by pressing `Cmd + K` (or `Ctrl + K`) to launch the Universal Search Palette.

## Administration Console
The **Admin Console** allows System Administrators to:
- Toggle **Maintenance Mode**, gracefully suspending incoming workloads while keeping active TEE evaluations running.
- Enforce **Global Rate Limiting** to prevent API abuse.
- Manage **Audit Retention Policies** to enforce data lifecycle rules.
