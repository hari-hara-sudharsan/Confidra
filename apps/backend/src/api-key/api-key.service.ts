import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  // In a real database, this would be stored in an ApiKey table hashed.
  private readonly mockApiKeys = new Map<string, { organizationId: string; type: 'live' | 'test' }>();

  constructor() {
    // Seed some mock keys for the hackathon
    this.mockApiKeys.set('sk_test_12345', { organizationId: 'org_1', type: 'test' });
    this.mockApiKeys.set('sk_live_98765', { organizationId: 'org_1', type: 'live' });
  }

  generateKey(organizationId: string, type: 'live' | 'test' = 'test'): string {
    const prefix = type === 'live' ? 'sk_live_' : 'sk_test_';
    const key = prefix + crypto.randomBytes(32).toString('hex');
    // Store plain text temporarily for this hackathon context (in production we'd store a bcrypt hash)
    this.mockApiKeys.set(key, { organizationId, type });
    return key;
  }

  validateKey(key: string) {
    const data = this.mockApiKeys.get(key);
    if (!data) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    return data;
  }
}
