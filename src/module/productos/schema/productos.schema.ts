import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IProductos } from "../interface/productos.interface"; // Asegúrate de que la ruta sea correcta
import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";
import { Clientes } from "src/module/clientes/schema/clientes.schema";

@Schema()
export class Productos extends Document implements IProductos {
    
    @Prop({ required: true })
    nombre_producto: string;  // Nombre del producto

    @Prop({ required: true })
    cantidad: number;  // Cantidad en inventario

    @Prop({ required: true })
    precio: number;  // Precio del producto

    // Referencia a múltiples proveedores usando 
    @Prop({
        type: [String],
        ref: 'Proveedores' ,
        required: true,
    })
    proveedor: Proveedores[]  // Relación con múltiples proveedores

    // Referencia a múltiples clientes usando 
    @Prop({ 
        type: [String],
        ref: 'Clientes' ,
        required: true,
    })
    cliente: Clientes[];// Relación con múltiples clientes

    @Prop({ default: true })
    activo?: boolean;  // Indica si el producto está activo o no
}

// Creación del esquema de Productos
export const ProductoSchema = SchemaFactory.createForClass(Productos);
