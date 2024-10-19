import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { ClientesModule } from './module/clientes/clientes.module';
import { ProductosModule } from './module/productos/productos.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://juliriveraquintero:3bAwpBHC9iNii0UQ@pruebas.1hkhp.mongodb.net/PruebasNestJS2?retryWrites=true&w=majority&appName=Pruebas'),
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
    
  ],
  
})
export class AppModule {}
