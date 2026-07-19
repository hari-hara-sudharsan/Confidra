import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string, userId: string) {
    // In a real production setup, use Postgres Full-Text Search (tsvector) or ElasticSearch.
    // For this implementation, we do basic ilike across tables.
    
    if (!query || query.length < 2) return { workflows: [], executions: [] };

    const workflows = await this.prisma.workflow.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 5
    });

    const executions = await this.prisma.executionLog.findMany({
      where: {
        OR: [
          { executionHash: { contains: query, mode: 'insensitive' } },
          { txHash: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 5
    });

    return {
      workflows,
      executions
    };
  }
}
