import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  // In production, this must come from a secure KMS or env variable.
  // Using a deterministic key here for hackathon/demonstration purposes.
  private readonly algorithm = 'aes-256-gcm';
  private readonly secretKey = crypto.createHash('sha256').update('confidra-tee-secret-key-2026').digest();

  encrypt(payload: any): { encryptedData: string; iv: string; authTag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    
    const textToEncrypt = JSON.stringify(payload);
    let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag,
    };
  }

  decrypt(encryptedData: string, iv: string, authTag: string): any {
    const decipher = crypto.createDecipheriv(
      this.algorithm, 
      this.secretKey, 
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }

  generateHash(data: any): string {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  // Verifies the ECDSA signature from the Flare TEE enclave
  verifyTeeSignature(hash: string, signature: string, publicKeyPem: string): boolean {
    const verify = crypto.createVerify('SHA256');
    verify.update(hash);
    verify.end();
    return verify.verify(publicKeyPem, signature, 'hex');
  }
}
