import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BaseRepository } from './base.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository extends BaseRepository<User, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findByWalletAddress(walletAddress: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { walletAddress } });
  }
}
