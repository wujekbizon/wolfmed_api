import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CompletedTestsModule } from './completed-tests/completed-tests.module';
import { BlogModule } from './blog/blog.module';
import { CustomersMessagesModule } from './customers-messages/customers-messages.module';
import { ProceduresModule } from './procedures/procedures.module';
import { TestsModule } from './tests/tests.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClerkMiddleware } from './auth/clerk.middleware';

@Module({
  imports: [
    DatabaseModule,
    CompletedTestsModule,
    BlogModule,
    CustomersMessagesModule,
    ProceduresModule,
    TestsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkMiddleware).forRoutes('*');
  }
}
