import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresServices } from './service/proveedores.service';
import { ProveedoresController } from './controller/proveedores.controller';
import { Proveedores, ProveedoresSchema } from './schema/proveedores.schema';



@Module({

    imports:[MongooseModule.forFeature([{
        name:Proveedores.name,
        schema: ProveedoresSchema,
    }])],
    controllers:[ProveedoresController],
    providers:[ProveedoresServices],
    exports:[ProveedoresServices]

    
})
export class ProveedoresModule {}
