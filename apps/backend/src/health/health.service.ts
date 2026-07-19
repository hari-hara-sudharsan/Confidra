import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private prisma: PrismaService) {}

  async getSystemHealth() {
    let dbStatus = 'Operational';
    let dbLatency = 0;
    try {
      const start = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      dbLatency = Date.now() - start;
    } catch (error) {
      dbStatus = 'Degraded';
    }

    // Mocking TEE & Flare status for demonstration, though in production 
    // these would be live HTTP pings to TEE worker and RPC endpoint.
    return {
      status: dbStatus === 'Operational' ? 'Healthy' : 'Degraded',
      services: {
        backendApi: { status: 'Operational', latencyMs: 2 },
        database: { status: dbStatus, latencyMs: dbLatency },
        teeWorker: { status: 'Operational', latencyMs: 14 },
        flareNetwork: { status: 'Operational', latencyMs: 120 }
      },
      timestamp: new Date().toISOString()
    };
  }
}
