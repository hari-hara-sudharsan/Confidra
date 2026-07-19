import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should encrypt and decrypt a payload correctly using AES-256-GCM', () => {
    const originalPayload = {
      decision: 'APPROVED',
      confidence: 99.5,
      fraudScore: 12
    };

    const { encryptedData, iv, authTag } = service.encrypt(originalPayload);
    
    expect(encryptedData).toBeDefined();
    expect(iv).toBeDefined();
    expect(authTag).toBeDefined();

    const decryptedPayload = service.decrypt(encryptedData, iv, authTag);
    expect(decryptedPayload).toEqual(originalPayload);
  });

  it('should generate a consistent SHA-256 hash', () => {
    const data = { id: 1, test: true };
    const hash1 = service.generateHash(data);
    const hash2 = service.generateHash(data);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64);
  });
});
