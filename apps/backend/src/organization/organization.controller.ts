import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create an organization' })
  create(@CurrentUser() user: User, @Body() dto: CreateOrganizationDto) {
    return this.organizationService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all organizations for the user' })
  findAll(@CurrentUser() user: User) {
    return this.organizationService.findAllForUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization details' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.organizationService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization' })
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto, @CurrentUser() user: User) {
    return this.organizationService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.organizationService.remove(id, user.id);
  }
}
