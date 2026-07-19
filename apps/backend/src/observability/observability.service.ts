import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservabilityService {
  getSystemMetrics() {
    return {
      apiLatency: Math.floor(Math.random() * 50) + 10, // 10-60ms
      teeExecutionTime: Math.floor(Math.random() * 200) + 300, // 300-500ms
      blockchainConfirmationTime: Math.floor(Math.random() * 500) + 1500, // 1.5-2.0s
      certificateGenerationTime: Math.floor(Math.random() * 10) + 5, // 5-15ms
      systemThroughput: Math.floor(Math.random() * 100) + 50, // req/sec
      errorRate: (Math.random() * 0.5).toFixed(2), // 0-0.5%
      activeEnclaves: 3,
      queuedJobs: Math.floor(Math.random() * 5)
    };
  }
}
