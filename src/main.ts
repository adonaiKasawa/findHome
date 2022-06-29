import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:19006","http://192.168.1.195:19006"]
  }
  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true,
    forbidNonWhitelisted:true,
  }));

  const config = new DocumentBuilder()
    .setTitle('find-home A.P.I')
    .setDescription('creat a app books link authors and systeme authantification')
    .setVersion('1.0')
    .addTag('All Route For App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
