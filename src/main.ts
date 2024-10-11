import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Aquí estableces el prefijo global 'api'
   app.setGlobalPrefix('api');

   // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API de Gestión de Inventario')
  .setDescription('APIs.')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);  // Configura Swagger en el endpoint '/api'

  await app.listen(3000);
}
bootstrap();
