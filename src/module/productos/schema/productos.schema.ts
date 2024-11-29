import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { IProductos } from "../interface/produectos.interface";
import { Clientes } from "src/module/clientes/schema/clientes.schema";
import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";

@Schema()
export class Productos extends Document implements IProductos {

    @Prop({ required: true })
    nombre_producto: string;

    @Prop({ required: true })
    cantidad: number;

    @Prop({ required: true })
    precio: number;

    @Prop({ type: [{ type: mongoose.SchemaTypes.ObjectId, ref: Proveedores.name }], required: false })
    proveedor: Types.ObjectId[];
    
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: Clientes.name}], required: false })
    cliente?: string[];

    @Prop({ default: true })
    activo?: boolean;

}

export const ProductoSchema = SchemaFactory.createForClass(Productos);
