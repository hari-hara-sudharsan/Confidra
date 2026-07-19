export interface User {
  id: string;
  walletAddress: string;
  email?: string;
}

export interface Workflow {
  id: string;
  orgId: string;
  name: string;
  schemaConfig: Record<string, any>;
  aiPromptHash: string;
}

export interface Application {
  id: string;
  workflowId: string;
  applicantHash: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
}
