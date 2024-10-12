import { Module } from '@nestjs/common';
import { CompletedTestsController } from './completed-tests.controller';
import { CompletedTestsService } from './completed-tests.service';

@Module({
  controllers: [CompletedTestsController],
  providers: [CompletedTestsService],
})
export class CompletedTestsModule {}
