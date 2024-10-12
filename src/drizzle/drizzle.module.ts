import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as testsSchema from '../tests/tests.schema';
import * as usersSchema from '../users/users.schema';
import * as proceduresSchema from '../procedures/procedures.schema';
import * as blogSchema from '../blog/blog.schema';
import * as completedTestsSchema from '../completed-tests/completed-tests.schema';
import * as customersMessagesSchema from '../customers-messages/customers-messages.schema';
// Import other schemas as needed

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE_ORM',
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const client = postgres(connectionString);
        return drizzle(client, {
          schema: {
            ...testsSchema,
            ...usersSchema,
            ...proceduresSchema,
            ...blogSchema,
            ...completedTestsSchema,
            ...customersMessagesSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_ORM'],
})
export class DrizzleModule {}
