import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getExecutiveDashboardStats() {
    const totalExecutions = await this.prisma.executionLog.count();
    const completedExecutions = await this.prisma.executionLog.count({ where: { status: 'COMPLETED' } });
    const failedExecutions = await this.prisma.executionLog.count({ where: { status: 'FAILED' } });
    
    // For demonstration, we'll mock the risk/confidence averages since SQLite/Prisma JSON aggregations can be tricky.
    // In a real Postgres environment, we would use raw queries: `SELECT AVG(CAST(resultPayload->>'confidence_score' AS FLOAT))`
    
    return {
      totalExecutions,
      completedExecutions,
      failedExecutions,
      averageConfidence: 0.92,
      averageRisk: 0.18,
      attestationsAnchored: completedExecutions, // All completed executions are anchored in this design
      
      // Data for Recharts
      executionTrends: [
        { name: 'Mon', count: 12 },
        { name: 'Tue', count: 19 },
        { name: 'Wed', count: 15 },
        { name: 'Thu', count: 22 },
        { name: 'Fri', count: 30 },
        { name: 'Sat', count: 28 },
        { name: 'Sun', count: 35 },
      ],
      riskDistribution: [
        { name: 'Low Risk', value: 70 },
        { name: 'Medium Risk', value: 20 },
        { name: 'High Risk', value: 10 },
      ]
    };
  }
}
