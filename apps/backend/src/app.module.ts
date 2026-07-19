import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { MemberModule } from './member/member.module';
import { WorkflowModule } from './workflow/workflow.module';
import { PolicyModule } from './policy/policy.module';
import { CryptoModule } from './crypto/crypto.module';
import { ExecutionModule } from './execution/execution.module';
import { RequestIdMiddleware } from './core/middlewares/request-id.middleware';
import { validateEnv } from './core/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 100,
    }]),
    DatabaseModule,
    HealthModule,
    AuthModule,
    OrganizationModule,
    WorkspaceModule,
    MemberModule,
    WorkflowModule,
    PolicyModule,
    CryptoModule,
    ExecutionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
