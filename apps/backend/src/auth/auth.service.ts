import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SiweMessage, generateNonce } from 'siwe';
import { PrismaService } from '../database/prisma.service';
import { VerifySiweDto } from './dto/verify-siwe.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  generateNonce(): string {
    return generateNonce();
  }

  async verifySiwe(dto: VerifySiweDto): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const siweMessage = new SiweMessage(dto.message);
      
      // Verify signature
      const { data: message } = await siweMessage.verify({
        signature: dto.signature,
      });

      const walletAddress = message.address;

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { walletAddress },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: { walletAddress },
        });
      }

      return this.generateTokens(user.id);
    } catch (error) {
      throw new UnauthorizedException('Invalid SIWE signature');
    }
  }

  async generateTokens(userId: string) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = uuidv4();

    // Store session
    await this.prisma.session.create({
      data: {
        userId,
        tokenHash: refreshToken, // Should hash this in production
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { tokenHash: refreshToken },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Delete old session (Rotation)
    await this.prisma.session.delete({ where: { id: session.id } });

    return this.generateTokens(session.userId);
  }

  async logout(refreshToken: string) {
    await this.prisma.session.deleteMany({
      where: { tokenHash: refreshToken },
    });
  }
}
