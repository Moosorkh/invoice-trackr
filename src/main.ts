import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);

    // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with the URL of your frontend app
    credentials: true,
  });

  await app.listen(3000);

}
bootstrap();
