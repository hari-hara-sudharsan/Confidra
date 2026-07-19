# Confidra Developer Portal

Welcome to the Confidra Developer Platform. Use these tools to embed Confidential Decision Infrastructure powered by Flare Confidential Compute directly into your own enterprise applications.

## Quick Start

### 1. Obtain an API Key
Generate a test or live API Key from your Organization Dashboard. Keep it secret.

### 2. Install the SDK

**Node.js / TypeScript**
```bash
npm install @confidra/sdk
```

**Python**
```bash
pip install confidra-sdk
```

### 3. Dispatch your first Workflow
```typescript
import { Confidra } from '@confidra/sdk';

const confidra = new Confidra('sk_test_...');

const result = await confidra.executions.create({
  workflowId: 'wf_...',
  data: {
    applicantName: "Alice",
    creditScore: 780
  }
});
console.log('Execution Status:', result.status);
```

## Platform Features

- **Webhooks**: Register your endpoint to receive `execution.completed` cryptographically signed events.
- **API Explorer**: Visit `http://localhost:3001/api/docs` to use our interactive Swagger UI.
- **CLI Toolkit**: Automate your pipeline using the Confidra CLI.
