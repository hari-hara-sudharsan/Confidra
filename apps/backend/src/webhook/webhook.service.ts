import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  // In production, endpoints and secrets are fetched per organization from DB
  private readonly mockEndpoints = new Map<string, { url: string; secret: string }>();

  constructor(private configService: ConfigService) {
    this.mockEndpoints.set('org_1', { 
      url: 'https://webhook.site/mock-url', 
      secret: 'whsec_mock_secret_key_for_testing' 
    });
  }

  /**
   * Generates a cryptographic signature matching Stripe's webhook signature format.
   * Format: t=12345,v1=signature
   */
  private generateSignature(payload: string, secret: string, timestamp: number): string {
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');
    
    return `t=${timestamp},v1=${signature}`;
  }

  /**
   * Dispatches a webhook to the registered endpoints for an organization.
   */
  async dispatchEvent(organizationId: string, eventType: string, data: any) {
    const endpoint = this.mockEndpoints.get(organizationId);
    if (!endpoint) {
      this.logger.debug(`No webhook endpoint configured for org ${organizationId}`);
      return;
    }

    const payload = JSON.stringify({
      id: `evt_${crypto.randomUUID()}`,
      object: 'event',
      type: eventType,
      created: Math.floor(Date.now() / 1000),
      data: { object: data }
    });

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.generateSignature(payload, endpoint.secret, timestamp);

    try {
      this.logger.log(`Dispatching webhook [${eventType}] to ${endpoint.url}`);
      
      // In a real environment, we'd use HttpService/axios here
      // For this hackathon stub, we simulate the network request:
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Confidra-Signature': signature,
        },
        body: payload
      });
      
      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
      
      this.logger.log(`Webhook [${eventType}] delivered successfully.`);
    } catch (err) {
      this.logger.error(`Webhook delivery failed: ${(err as Error).message}`);
      // A production system would insert this into a dead-letter queue for retries
    }
  }
}
