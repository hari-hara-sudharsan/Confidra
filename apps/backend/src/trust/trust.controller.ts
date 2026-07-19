import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrustService } from './trust.service';

@ApiTags('Trust Infrastructure')
@Controller('v1/trust')
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Get('verify/:id')
  @ApiOperation({ summary: 'Public endpoint to verify a Trust Certificate' })
  @ApiResponse({ status: 200, description: 'Returns the verified Certificate Bundle.' })
  @ApiResponse({ status: 404, description: 'Certificate not found.' })
  @ApiResponse({ status: 400, description: 'Certificate integrity or signature violation.' })
  async verifyCertificate(@Param('id') id: string) {
    try {
      const certificate = this.trustService.verifyCertificate(id);
      return {
        status: 'success',
        data: certificate
      };
    } catch (error) {
       throw new HttpException({
         status: 'error',
         message: (error as Error).message
       }, HttpStatus.BAD_REQUEST);
    }
  }
}
