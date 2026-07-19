import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI Intelligence')
@Controller('v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-workflow')
  @ApiOperation({ summary: 'Generate a workflow JSON from natural language' })
  async generateWorkflow(@Body() body: { prompt: string }) {
    return this.aiService.generateWorkflowFromPrompt(body.prompt);
  }

  @Get('explain/:executionId')
  @ApiOperation({ summary: 'Generate cryptographic explainability for a decision' })
  async explainDecision(@Param('executionId') executionId: string) {
    return this.aiService.generateExplanation(executionId, {});
  }
}
