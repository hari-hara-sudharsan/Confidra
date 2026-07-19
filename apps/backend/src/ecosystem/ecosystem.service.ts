import { Injectable, Logger } from '@nestjs/common';

export interface MarketplaceItem {
  id: string;
  name: string;
  type: 'workflow' | 'policy' | 'plugin';
  description: string;
  author: string;
  downloads: number;
  verified: boolean;
}

@Injectable()
export class EcosystemService {
  private readonly logger = new Logger(EcosystemService.name);
  private items: MarketplaceItem[] = [];

  constructor() {
    // Seed mock marketplace data
    this.items = [
      {
        id: 'wf_scholarship',
        name: 'University Scholarship Evaluator',
        type: 'workflow',
        description: 'Complete confidential workflow for evaluating student financial and academic records without exposing PII.',
        author: 'EduTech Inc.',
        downloads: 1250,
        verified: true
      },
      {
        id: 'pol_kyc',
        name: 'Strict KYC / AML Policy',
        type: 'policy',
        description: 'Pre-configured risk thresholds for evaluating identity verification documents.',
        author: 'Confidra Core',
        downloads: 8400,
        verified: true
      },
      {
        id: 'plug_slack',
        name: 'Slack Notification Provider',
        type: 'plugin',
        description: 'Securely broadcast non-confidential execution metadata to Slack channels.',
        author: 'Slack',
        downloads: 3200,
        verified: true
      }
    ];
  }

  getMarketplaceItems(): MarketplaceItem[] {
    return this.items;
  }

  getPlugins(): MarketplaceItem[] {
    return this.items.filter(i => i.type === 'plugin');
  }

  getWorkflows(): MarketplaceItem[] {
    return this.items.filter(i => i.type === 'workflow');
  }

  installPlugin(pluginId: string) {
    this.logger.log(`Installing plugin ${pluginId}`);
    return { success: true, message: `Plugin ${pluginId} installed successfully.` };
  }
}
