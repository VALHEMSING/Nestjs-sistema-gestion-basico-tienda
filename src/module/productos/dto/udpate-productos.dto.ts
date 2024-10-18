import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class UpdateProductoDto {
    @IsOptional()
    @IsString()
    nombre_producto?: string;  // El nombre del producto puede ser actualizado

    @IsOptional()
    @IsNumber()
    cantidad?: number;  // La cantidad puede ser actualizada

    @IsOptional()
    @IsNumber()
    precio?: number;  // El precio puede ser actualizado

    // El campo de proveedores es opcional cuando se actualiza un producto
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    proveedor?: Types.ObjectId[];  // Array de ObjectIds que hace referencia a los proveedores

    // Si necesitas referenciar clientes por su ID
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    cliente?: Types.ObjectId[];  // Array de ObjectIds que hace referencia a los clientes

    @IsOptional()
    activo?: boolean;  // Indica si el producto está activo o no
}
