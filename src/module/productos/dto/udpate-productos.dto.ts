import { IsOptional, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsMongoId } from 'class-validator';

export class UpdateProductoDto {

    @IsOptional()
    @IsNotEmpty()
    nombre_producto?: string;  // Nombre del producto

    @IsOptional()
    @IsNumber()
    cantidad?: number;  // Cantidad en inventario

    @IsOptional()
    @IsNumber()
    precio?: number;  // Precio del producto

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    proveedor?: string[];  // Array de ObjectIds de Proveedores

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    cliente?: string[];  // Array de ObjectIds de Clientes

    @IsOptional()
    @IsBoolean()
    activo?: boolean;  // Opción para marcar si el producto está activo o no
}
