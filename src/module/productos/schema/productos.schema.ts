import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IProductos } from "../interface/produectos.interface";

@Schema()
export class Productos extends Document implements IProductos{

    @Prop({required: true})
    nombre_producto: string;

    @Prop({required: true})
    cantidad: number;

    @Prop({required: true})
    precio: number;

    @Prop({default: true})
    activo?: boolean;

}

export const ProductoSchema =  SchemaFactory.createForClass(Productos);