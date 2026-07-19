import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SecurityService } from './security.service';

@ApiTags('Security Operations')
@Controller('v1/security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('events')
  @ApiOperation({ summary: 'Get recent security events' })
  getEvents() {
    return this.securityService.getRecentEvents();
  }

  @Get('posture')
  @ApiOperation({ summary: 'Get overall security posture' })
  getPosture() {
    return this.securityService.getSecurityPosture();
  }
}
