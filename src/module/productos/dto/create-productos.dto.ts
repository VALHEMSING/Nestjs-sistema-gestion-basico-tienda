import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateProductoDto {
    @IsString()
    nombre_producto: string;  // Nombre del producto

    @IsNumber()
    cantidad: number;  // Cantidad del producto

    @IsNumber()
    precio: number;  // Precio del producto

    // El campo de proveedores es opcional cuando creamos un producto
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    proveedor?: Types.ObjectId[];  // Array de ObjectIds que referencia a los proveedores

    // Si necesitas referenciar clientes por su ID
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    cliente?: Types.ObjectId[];  // Array de ObjectIds que referencia a los clientes

    // Activo es opcional y se puede definir en el modelo si no se proporciona
    @IsOptional()
    activo?: boolean;  // Indica si el producto está activo
}
