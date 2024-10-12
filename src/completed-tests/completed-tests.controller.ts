import { Controller, Get, Delete, Param, HttpCode } from '@nestjs/common';
import { CompletedTestsService } from './completed-tests.service';

@Controller('completed-tests')
export class CompletedTestsController {
  constructor(private readonly completedTestsService: CompletedTestsService) {}

  @Get('user/:userId')
  async getCompletedTestsByUser(@Param('userId') userId: string) {
    return this.completedTestsService.getCompletedTestsByUser(userId);
  }

  @Get(':id')
  async getCompletedTest(@Param('id') id: string) {
    return this.completedTestsService.getCompletedTest(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCompletedTest(@Param('id') id: string) {
    await this.completedTestsService.deleteCompletedTest(id);
  }
}
