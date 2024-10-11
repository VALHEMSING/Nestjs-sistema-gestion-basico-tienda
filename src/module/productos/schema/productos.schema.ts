import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IProductos } from "../interface/produectos.interface";
import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";

@Schema()
export class Productos extends Document implements IProductos{

    @Prop({required: true})
    nombre_producto: string;

    @Prop({required: true})
    cantidad: number;

    @Prop({required: true})
    precio: number;

    @Prop({ type: String,ref: 'Proveedores',required: true})
    proveedor: Proveedores;

    @Prop({default: true})
    activo?: boolean;

}

export const ProductoSchema =  SchemaFactory.createForClass(Productos);