import { IsNotEmpty, IsString, IsBoolean, IsNumber} from "class-validator";


export class CreateProductosDto {

    @IsNotEmpty()
    @IsString()
    nombre_producto: string;

    @IsNotEmpty()
    @IsNumber()
    cantidad: number;

    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsBoolean()
    activo?: boolean;

}