import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('REST to GraphQL API')
    .setDescription('A comprehensive API supporting both REST and GraphQL endpoints for User, Post, and Comment management')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  console.log(`Swagger is running on http://localhost:${process.env.PORT || 3000}/api`);
  console.log(`GraphQL Playground is running on http://localhost:${process.env.PORT || 3000}/graphql`);
}
bootstrap();
