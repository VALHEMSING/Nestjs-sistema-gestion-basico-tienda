import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API Sistema de gestión ')
  .setDescription('Se vera las APIs de nuestro sistema')
  .setVersion('1.0.0')
   .addTag('' )  // Etiqueta para agrupar los endpoints
  .build();
  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);  // Configura Swagger en el endpoint '/api'

    console.log(`Documentación de Swagger está disponible en: http://localhost:3000/api`);


  await app.listen(3000);
}
bootstrap();
