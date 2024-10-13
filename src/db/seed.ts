import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../schema';
import * as dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function readDataFileAndParse(
  fileName: string,
  folder = 'data',
  encoding: BufferEncoding = 'utf-8',
) {
  const filePath = path.join(process.cwd(), folder, fileName);
  const data = await readFile(filePath, encoding);
  return JSON.parse(data);
}

async function insertData<T>(
  data: T[],
  table: any,
  mapToInsertValues: (item: T) => any,
) {
  for (const item of data) {
    await db.insert(table).values(mapToInsertValues(item));
  }
}

async function populateTests() {
  try {
    const testsData = (await readDataFileAndParse(
      'wolfmed_tests.json',
    )) as schema.Test[];

    await insertData(testsData, schema.tests, (test) => ({
      category: test.category,
      data: test.data,
    }));

    console.log('Tests table populated successfully!');
  } catch (error) {
    console.error('Error populating tests table:', error);
  }
}

async function populateProcedures() {
  try {
    const proceduresData = (await readDataFileAndParse(
      'wolfmed_procedures.json',
    )) as schema.Procedure[];

    await insertData(proceduresData, schema.procedures, (procedure) => ({
      data: procedure.data,
    }));

    console.log('Procedures table populated successfully!');
  } catch (error) {
    console.error('Error populating procedures table:', error);
  }
}

async function populatePosts() {
  try {
    const postsData = (await readDataFileAndParse(
      'wolfmed_blog_posts.json',
    )) as schema.Post[];

    await insertData(postsData, schema.blogPosts, (post) => ({
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
    }));

    console.log('Posts table populated successfully!');
  } catch (error) {
    console.error('Error populating posts table:', error);
  }
}

async function seedDatabase() {
  try {
    await populateTests();
    await populateProcedures();
    await populatePosts();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
