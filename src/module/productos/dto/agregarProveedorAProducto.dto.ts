import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";



export class AgregarProveedorAProductoDto{


    @IsArray()
    proveedor: Types.ObjectId[]
}