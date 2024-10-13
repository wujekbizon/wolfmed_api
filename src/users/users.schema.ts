import { users as usersSchema } from '../schema';

// Import the table definition from the centralized schema.ts file
// to allow for drizzle-kit migrations while maintaining Nest.js module structure
export const users = usersSchema;
