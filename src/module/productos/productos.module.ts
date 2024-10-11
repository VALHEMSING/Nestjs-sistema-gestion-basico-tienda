import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosServices } from './services/productos.services';
import { ProductosControllers } from './controllers/productos.controllers';
import { Productos, ProductoSchema } from './schema/productos.schema';


@Module({
    imports:[MongooseModule.forFeature([{
        name: Productos.name,
        schema: ProductoSchema,
    }])],
    controllers:[ProductosControllers],
    providers:[ProductosServices],

})
export class ProductosModule {}
