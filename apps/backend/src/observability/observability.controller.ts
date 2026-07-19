import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ObservabilityService } from './observability.service';

@ApiTags('Observability')
@Controller('v1/observability')
export class ObservabilityController {
  constructor(private readonly obsService: ObservabilityService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get live system performance metrics' })
  getMetrics() {
    return this.obsService.getSystemMetrics();
  }
}
