import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EcosystemService } from './ecosystem.service';

@ApiTags('Ecosystem & Marketplace')
@Controller('v1/ecosystem')
export class EcosystemController {
  constructor(private readonly ecosystemService: EcosystemService) {}

  @Get('marketplace')
  @ApiOperation({ summary: 'Get all marketplace items' })
  getMarketplace() {
    return this.ecosystemService.getMarketplaceItems();
  }

  @Post('plugins/:id/install')
  @ApiOperation({ summary: 'Install a marketplace plugin' })
  installPlugin(@Param('id') id: string) {
    return this.ecosystemService.installPlugin(id);
  }
}
