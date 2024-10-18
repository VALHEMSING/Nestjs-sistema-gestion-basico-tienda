import { IsNotEmpty, IsNumber, IsBoolean, IsArray, IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose'
import { Types } from 'mongoose';

export class CreateProductoDto {

    @IsNotEmpty()
    nombre_producto: string;  // Nombre del producto

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;  // Cantidad en inventario

    @IsNumber()
    @IsNotEmpty()
    precio: number;  // Precio del producto

    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    proveedor: Types.ObjectId[];  // Array de ObjectIds de Proveedores

    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    cliente: Types.ObjectId[];  // Array de ObjectIds de Clientes

    @IsBoolean()
    activo?: boolean;  // Opción para marcar si el producto está activo
}
