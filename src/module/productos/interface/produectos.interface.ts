
export interface IProductos {
    id?: string;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    proveedor: string[];
    activo?: boolean;
}
