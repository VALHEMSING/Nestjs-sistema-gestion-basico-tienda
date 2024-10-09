import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProveedores } from '../interface/proveedores.interface';


@Schema()
export class Proveedores extends Document implements IProveedores{

    @Prop({required: true})
    nombre_proveedor: string;

    @Prop({required: true})
    email_proveedor: string;

    @Prop({required: true})
    celular_proveedor: string;

}

export const ProveedoresSchema = SchemaFactory.createForClass(Proveedores);

