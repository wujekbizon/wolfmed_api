import { Module } from '@nestjs/common';
import { CompletedTestsController } from './completed-tests.controller';
import { CompletedTestsService } from './completed-tests.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [CompletedTestsController],
  providers: [CompletedTestsService],
})
export class CompletedTestsModule {}
