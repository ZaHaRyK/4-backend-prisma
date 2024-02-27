import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { EntityNotFoundExceptionFilter } from './filters/entity.not.found.filters';
import { HttpExceptionFilter } from './filters/http.exeption.filters';
import { AppModule } from './app.module';
import 'dotenv/config';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('4 lvl')
    .setDescription('4 lvl api swagger')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(+process.env.SERVER_PORT);
}
bootstrap();
