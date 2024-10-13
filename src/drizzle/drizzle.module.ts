import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as testsSchema from '../tests/tests.schema';
import * as usersSchema from '../users/users.schema';
import * as proceduresSchema from '../procedures/procedures.schema';
import * as blogSchema from '../blog/blog.schema';
import * as completedTestsSchema from '../completed-tests/completed-tests.schema';
import * as customersMessagesSchema from '../customers-messages/customers-messages.schema';
// Import other schemas as needed
import * as schema from '../schema';

// Add this type alias
type DrizzleSchema = typeof testsSchema &
  typeof usersSchema &
  typeof proceduresSchema &
  typeof blogSchema &
  typeof completedTestsSchema &
  typeof customersMessagesSchema;

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DRIZZLE_ORM',
      useFactory: async (
        configService: ConfigService,
      ): Promise<NeonHttpDatabase<DrizzleSchema>> => {
        const connectionString = configService.get<string>('DATABASE_URL');
        neonConfig.fetchConnectionCache = true;
        const sql = neon(connectionString);
        return drizzle(sql, {
          schema: schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE_ORM'],
})
export class DrizzleModule {}
