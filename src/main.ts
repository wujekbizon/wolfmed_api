import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  // Enable CORS
  app.enableCors();

  // Use the PORT environment variable if available, otherwise default to 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server is running on: http://localhost:${port}/api`);
}
bootstrap();
