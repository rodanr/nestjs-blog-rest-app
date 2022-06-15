import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this line should be executed to use class-validator in action
  app.useGlobalPipes(
    //whitelist feature will make sure  all those unwanted or invalid properties are stripped out and removed
    // forbidNonWhitelisted throws error if unwanted properties are included in the body
    // transform does change type according to the dto set to avoid problems
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
