import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";


export interface IProductos{
    id?: string;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    proveedor: Proveedores;
    activo?: boolean;
}