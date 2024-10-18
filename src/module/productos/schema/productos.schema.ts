import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";  // Importar Document aquí
import { IProductos } from "../interface/productos.interface"; // Asegúrate de que la ruta sea correcta
import { Document } from "mongoose";
import * as mongoose from 'mongoose';

// Definición del esquema de Productos
@Schema()
export class Productos extends Document implements IProductos {

    

    @Prop({ required: true })
    nombre_producto: string;  // Nombre del producto

    @Prop({ required: true })
    cantidad: number;  // Cantidad en inventario

    @Prop({ required: true })
    precio: number;  // Precio del producto

    // Definir como un array de ObjectIds que referencia a Proveedores
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Proveedores', required: true })
    proveedor: mongoose.Schema.Types.ObjectId[];  // Relación con múltiples proveedores

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Clientes', required: true })
    cliente: mongoose.Schema.Types.ObjectId[];  // Relación con múltiples clientes

    @Prop({ default: true })
    activo?: boolean;  // Indica si el producto está activo o no
}

// Creación del esquema de Productos
export const ProductoSchema = SchemaFactory.createForClass(Productos);
