import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://juliriveraquintero:YeVCqk4nSfMmzBTq@pruebas.1hkhp.mongodb.net/PruebasNestJS?retryWrites=true&w=majority&appName=Pruebas'),
    ProveedoresModule,
    
  ],
  
})
export class AppModule {}
