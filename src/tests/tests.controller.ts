import { Controller, Get, Param } from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  async getAllTests() {
    return this.testsService.getAllTests();
  }

  @Get(':id')
  async getTestById(@Param('id') id: string) {
    return this.testsService.getTestById(id);
  }
}
