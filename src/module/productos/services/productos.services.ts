import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId  } from 'mongoose';
import { Productos } from '../schema/productos.schema';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductoDto } from '../dto/udpate-productos.dto';
import { ProveedoresServices } from 'src/module/proveedores/service/proveedores.service';
import { ClientesService } from 'src/module/clientes/service/clientes.service';


@Injectable()
export class ProductosServices{
    constructor(@InjectModel(Productos.name) private productosModel: Model<Productos>,
            private proveedoresServices: ProveedoresServices,
            private clientesServices: ClientesService)
    {

    }

    async createProducto(createProductosDto: CreateProductoDto): Promise<Productos>
    {
        const createProducto = new this.productosModel(createProductosDto);
        return createProducto.save();
    }


    async findAllProdutos(): Promise<Productos[]>{
        const findAllProdutos = await this.productosModel.find().populate('proveedor').populate('cliente').exec();
        return findAllProdutos;
    }


    async findOne(id: string): Promise<Productos>{
        const findOneProducto = await this.productosModel.findById(id)
        .populate('proveedor')
        .populate('cliente')
        .exec();
        if(!findOneProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return findOneProducto;
    }

    async update(id: string, updateProductosDto: UpdateProductoDto): Promise<Productos> {
        try {
            const updateProducto = await this.productosModel.findByIdAndUpdate(
                id,
                updateProductosDto,
                { new: true }
            ).exec();
            
            if (!updateProducto) {
                throw new NotFoundException(`Producto con Id ${id} no se encontró`);
            }
            return updateProducto;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }
    


    async udpatePartial(id: string, updateProductosDto: UpdateProductoDto): Promise<Productos>{
        const updatePartialProducto = await this.productosModel.findByIdAndUpdate(
            id,
            updateProductosDto,
        {new : true})
        .exec();
        if(!updatePartialProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return updatePartialProducto;
    }


    async deactivate(id: string): Promise<void> {
        try {
            const deactivateProducto = await this.productosModel.findByIdAndUpdate(
                id,
                { activo: false },
                { new: true }
            ).populate('proveedor').exec();
            
            if (!deactivateProducto) {
                throw new NotFoundException(`Producto con Id ${id} no se encontró`);
            }
        } catch (error) {
            throw new Error('Error al desactivar el producto: ' + error.message);
        }
    }
    


    async active(id: string): Promise<void>{
        const activeProducto = await this.productosModel.findByIdAndUpdate(
            id,
            {activo: true},
            {new: true})
            
            .exec();
        if(!activeProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
    }


    // Metodo para eliminar un Proucto
    async delete(id: string): Promise<void>{
        const deleteProducto = await this.productosModel.findByIdAndDelete(id);
        if(!deleteProducto)
        {
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
    }

    async agregarProveedorAProducto(productoId: string, proveedorId: string): Promise<Productos> {
        // Verificamos que el producto exista
        const producto = await this.productosModel.findById(productoId);
        if (!producto) {
            throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
        }
    
        // Verificamos que el proveedor exista
        const proveedor = await this.proveedoresServices.findOne(proveedorId);
        if (!proveedor) {
            throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
        }
    
        try {
            // Convertir el proveedorId a ObjectId
            const proveedorObjectId = proveedor._id as Types.ObjectId;
    
            // Agregamos el proveedor a la lista de proveedores si no está ya agregado
            const productoActualizado = await this.productosModel.findByIdAndUpdate(
                productoId,
                { $addToSet: { proveedor: proveedorObjectId } }, // $addToSet agrega el valor solo si no existe
                { new: true } // Devuelve el documento actualizado
            ).populate('proveedor'); // Opcional: para obtener el producto con los datos del proveedor
    
            return productoActualizado;
        } catch (error) {
            throw new BadRequestException('Error al agregar proveedor: ' + error.message);
        }
    }
    


async eliminarProveedorDeProducto(productoId: string, proveedorId: string): Promise<Productos> {
    // Verificamos la existencia del producto
    const producto = await this.productosModel.findById(productoId);
    if (!producto) {
        throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    // Verificamos que el proveedor exista
    const proveedor = await this.proveedoresServices.findOne(proveedorId);
    if (!proveedor) {
        throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
    }

    // Usamos $pull para eliminar el proveedor del array
    const productoActualizado = await this.productosModel.findByIdAndUpdate(
        productoId,
        { $pull: { proveedor: proveedorId } }, // Eliminamos el proveedorId del array
        { new: true } // Devuelve el documento actualizado
    ).populate('proveedor'); // Opcional: para obtener el producto con los datos actualizados

    // Verificamos si el producto fue actualizado
    if (!productoActualizado) {
        throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    return productoActualizado;
}



    async agregarClientesAProducto(productoId: string, clienteId: string): Promise<Productos>{

        // Verificamos la existencia del producto
        const producto = await this.productosModel.findById(productoId);
        if (!producto) {
            throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
        }

        /*Verificamos la existencia del cliente */
        const cliente = await this.clientesServices.findOne(clienteId);
        if(!cliente){
            throw new NotFoundException(`Cliente con Id ${clienteId} no asociado`)
        }
        // Convertir el clienteId a ObjectId
        const clienteObjectId = cliente._id as Types.ObjectId;
        // Agregamos el proveedor a la lista de proveedores si no está ya agregado
    const productoActualizado = await this.productosModel.findByIdAndUpdate( productoId,
        { $addToSet: {
            cliente: clienteObjectId 
        }}, // $addToSet agrega el valor solo si no existe
        { new: true } // Devuelve el documento actualizado
        ).populate('cliente'); // Opcional: para obtener el producto con los datos del proveedor
            
    // Verificamos si el producto fue actualizado
    if (!productoActualizado) {
        throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

        return producto.save();
    }


    async eliminarClientesDeProducto(productoId: string, clienteId: string): Promise<Productos>{

        // Verificamos la existencia del producto
        const producto = await this.productosModel.findById(productoId);
        if (!producto) {
            throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
        }

        /*Verificamos la existencia del cliente */
        const cliente = await this.clientesServices.findOne(clienteId);
        if(!cliente){
            throw new NotFoundException(`Cliente con Id ${clienteId} no asociado`)
        }

        //Usamos $pull para eliminar el cliente del array
        const productoActualizado = await this.productosModel.findByIdAndUpdate(productoId,
            {$pull:{cliente: clienteId}}, // Eliminamos el clienteID del array
            {new: true} // Devuelve el domcumento actualizado
        ).populate('cliente'); // Opvional: para obtener el producto con los datos actualizados

        // Verificamos si el producto fue actualizado
    if (!productoActualizado) {
        throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    }

    return productoActualizado;
    }

}