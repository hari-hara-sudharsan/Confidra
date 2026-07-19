import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

export interface TrustCertificate {
  id: string;
  version: string;
  workflowId: string;
  executionId: string;
  organizationId: string;
  policyVersion: string;
  decisionHash: string;
  executionHash: string;
  blockchainTxHash: string;
  blockNumber: number;
  timestamp: number;
  signer: string;
  verificationStatus: string;
  integrityHash: string;
  platformSignature: string;
}

@Injectable()
export class TrustService {
  private readonly logger = new Logger(TrustService.name);
  private readonly platformPrivateKey: string; // In production this is a secure KMS key
  
  // Mock DB for Hackathon
  private readonly mockCertificates = new Map<string, TrustCertificate>();

  constructor(private configService: ConfigService) {
    // For demo purposes, we generate an ephemeral key if not provided
    this.platformPrivateKey = this.configService.get<string>('PLATFORM_PRIVATE_KEY') || crypto.generateKeyPairSync('ec', { namedCurve: 'secp256k1' }).privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
    
    // Seed a mock certificate for the UI to display
    const mockCert = this.generateCertificate(
      'exec_012345',
      'wf_9876',
      'org_1',
      'v1.0.0',
      '0xabc123...',
      '0xdef456...',
      '0x789txhash...',
      1543902,
      '0xTeeEnclaveKey...'
    );
    this.mockCertificates.set('cert_mock_123', mockCert);
  }

  /**
   * Phase 1 & 2: Trust Certificate Engine & Cryptographic Signing
   */
  generateCertificate(
    executionId: string,
    workflowId: string,
    organizationId: string,
    policyVersion: string,
    decisionHash: string,
    executionHash: string,
    blockchainTxHash: string,
    blockNumber: number,
    signer: string
  ): TrustCertificate {
    const certId = `cert_${crypto.randomUUID()}`;
    const timestamp = Math.floor(Date.now() / 1000);

    // Create the payload without the final integrity and signature
    const payload = {
      id: certId,
      version: '1.0',
      workflowId,
      executionId,
      organizationId,
      policyVersion,
      decisionHash,
      executionHash,
      blockchainTxHash,
      blockNumber,
      timestamp,
      signer,
      verificationStatus: 'Verified',
    };

    // Phase 2: Hash Generation (Integrity Hash)
    const payloadString = JSON.stringify(payload);
    const integrityHash = crypto.createHash('sha256').update(payloadString).digest('hex');

    // Phase 2: Digital Signatures (Platform Signature)
    // In this stub, we just HMAC it to simulate a signature if we don't have a full KMS
    const platformSignature = crypto.createHmac('sha256', this.platformPrivateKey).update(integrityHash).digest('hex');

    const certificate: TrustCertificate = {
      ...payload,
      integrityHash,
      platformSignature
    };

    this.mockCertificates.set(certId, certificate);
    this.logger.log(`Generated Trust Certificate: ${certId}`);

    return certificate;
  }

  /**
   * Phase 3 & 11: Verification Portal Retrieval & Integrity Validation
   */
  verifyCertificate(id: string): TrustCertificate {
    const cert = this.mockCertificates.get(id);
    if (!cert) {
      throw new NotFoundException(`Trust Certificate ${id} not found.`);
    }

    // Recalculate integrity hash
    const { integrityHash, platformSignature, ...payload } = cert;
    const payloadString = JSON.stringify(payload);
    const expectedHash = crypto.createHash('sha256').update(payloadString).digest('hex');

    if (expectedHash !== integrityHash) {
      this.logger.warn(`Integrity violation detected for Certificate ${id}`);
      throw new Error('Certificate Integrity Violation. Tampering detected.');
    }

    const expectedSignature = crypto.createHmac('sha256', this.platformPrivateKey).update(integrityHash).digest('hex');
    if (expectedSignature !== platformSignature) {
       this.logger.warn(`Signature violation detected for Certificate ${id}`);
       throw new Error('Certificate Signature Violation. Platform signer mismatch.');
    }

    return cert;
  }

  getCertificatesForOrg(orgId: string): TrustCertificate[] {
    return Array.from(this.mockCertificates.values()).filter(c => c.organizationId === orgId);
  }
}
