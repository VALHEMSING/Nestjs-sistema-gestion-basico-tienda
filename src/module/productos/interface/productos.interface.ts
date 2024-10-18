import { Clientes } from "src/module/clientes/schema/clientes.schema";
import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";

import * as mongoose from 'mongoose'
export interface IProductos {
    id?: string;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    
    activo?: boolean;
}
