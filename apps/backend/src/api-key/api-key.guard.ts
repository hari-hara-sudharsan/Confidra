import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-api-key'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('Missing x-api-key header');
    }

    const keyData = this.apiKeyService.validateKey(apiKeyHeader);
    
    // Inject the validated organization data into the request for downstream controllers
    request.apiAuth = keyData;
    
    return true;
  }
}
