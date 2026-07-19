/**
 * Confidra TypeScript SDK
 * The official library for integrating Confidra Confidential Execution Engine.
 */

export class Confidra {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    if (!apiKey) throw new Error('Confidra API Key is required');
    this.apiKey = apiKey;
    this.baseUrl = options?.baseUrl || 'https://api.confidra.dev/v1';
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Confidra API Error (${response.status}): ${errorData.message || response.statusText}`);
    }
    
    return response.json();
  }

  public executions = {
    /**
     * Submit a new confidential execution workflow.
     */
    create: async (payload: { workflowId: string; data: Record<string, any> }) => {
      return this.fetch('/executions', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    /**
     * Retrieve the status and results of a confidential execution.
     */
    retrieve: async (id: string) => {
      return this.fetch(`/executions/${id}`);
    }
  };
}
