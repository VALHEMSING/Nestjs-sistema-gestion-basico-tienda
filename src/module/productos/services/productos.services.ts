import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import  { Model, Types } from 'mongoose';
import { Productos } from '../schema/productos.schema';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/udpate-productos.dto';
import { Proveedores } from 'src/module/proveedores/schema/proveedores.schema';
import { ProveedoresServices } from 'src/module/proveedores/service/proveedores.service';
import { ClientesService } from 'src/module/clientes/service/clientes.service';

import * as mongoose from 'mongoose'


@Injectable()
export class ProductosServices{
    constructor(@InjectModel(Productos.name) private productosModel: Model<Productos>,
    @InjectModel(Proveedores.name) private readonly proveedoresModel: Model<Proveedores>,
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
        const findOneProducto = await this.productosModel.findById(id).populate('proveedor').populate('cliente').exec();
        if(!findOneProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return findOneProducto;
    }

    async udpate(id: string, updateProductosDto: UpdateProductosDto): Promise<Productos>{
        const updateProducto = await this.productosModel.findByIdAndUpdate(
            id,
            updateProductosDto,
        {new : true})
        .exec();
        if(!updateProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return updateProducto;
    }


    async udpatePartial(id: string, updateProductosDto: UpdateProductosDto): Promise<Productos>{
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


    async deactive(id: string): Promise<void>{
        const deactiveProducto = await this.productosModel.findByIdAndUpdate(
            id,
            {activo: false},
            {new: true})
            .populate('proveedor')
            .exec();
        if(!deactiveProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
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


    async addProveedorToProducto(productoId: string, proveedorId: string): Promise<Productos> {
        // Validate ObjectIds
        if (!Types.ObjectId.isValid(productoId) || !Types.ObjectId.isValid(proveedorId)) {
            throw new NotFoundException('Invalid product or provider ID');
        }

        // Convert strings to ObjectIds
        const productoObjectId = new Types.ObjectId(productoId);
        const proveedorObjectId = new Types.ObjectId(proveedorId);

        // Find and update product
        const producto = await this.productosModel.findById(productoObjectId);
        if (!producto) {
            throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
        }

        const proveedor = await this.proveedoresModel.findById(proveedorObjectId);
        if (!proveedor) {
            throw new NotFoundException(`Proveedor con ID ${proveedorId} no encontrado`);
        }

        // Add provider if not already present
        if (!producto.proveedor.includes(proveedorObjectId)) {
            producto.proveedor.push(proveedorObjectId);
            await producto.save();
        }

        return producto;

    }

    //  // Método para agregar un proveedor a un producto
//  async agregarProveedorAProducto(
//     productoId: string,
//     proveedorId: string,
// ): Promise<Productos> {
//     // Convertimos los ids a ObjectId para mayor consistencia
//     const productoObjectId = new mongoose.Types.ObjectId(productoId);
//     const proveedorObjectId = new mongoose.Types.ObjectId(proveedorId);

//     // Verificamos la existencia del producto
//     const producto = await this.productosModel
//         .findById(productoObjectId)
//         .populate('proveedor');
//     if (!producto) {
//         throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
//     }

//     // Verificamos que el proveedor exista
//     const proveedor = await this.proveedoresService.findOne(proveedorId);
//     if (!proveedor) {
//         throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
//     }

//     // Agregamos el proveedor a la lista de proveedores si no está ya agregado
//     if (!producto.proveedor.some(id => id.equals(proveedorObjectId))) {
//         producto.proveedor.push(proveedorObjectId);
//     } else {
//         throw new Error(`El proveedor ya está asociado a este producto`);
//     }

//     // Guardamos los cambios en la base de datos
//     return await producto.save();
// }
     /** */

    // async agregarProveedorAProducto(productoId: string, proveedorId: string): Promise<Productos> {
    //     // Verificamos la existencia del producto
    //     const producto = await this.productosModel.findById(productoId);
    //     if (!producto) {
    //         throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    //     }

    //     // Verificamos que el proveedor exista
    //     const proveedor = await this.proveedoresServices.findOne(proveedorId);
    //     if (!proveedor) {
    //         throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
    //     }

    //      // Agregamos el proveedor a la lista de proveedores si no está ya agregado
    //     if (!producto.proveedor.includes(proveedorId)) {
    //         producto.proveedor.push(proveedorId);
    //     } else {
    //         throw new Error(`El proveedor ya está asociado a este producto`);
    //     }

    //     // Guardamos los cambios en la base de datos
    //     return await producto.save();
    // }

    async eliminarProveedorDeProducto(productoId: string, proveedorId: string): Promise<Productos> {
        // Verificar que el producto existe
        const producto = await this.productosModel.findById(productoId);
        if (!producto) {
          throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
        }
      
        // Validar que el ID del proveedor sea válido
        if (!mongoose.Types.ObjectId.isValid(proveedorId)) {
          throw new NotFoundException(`El ID ${proveedorId} no es un ObjectId válido.`);
        }
      
        const objectIdProveedorId = new mongoose.Types.ObjectId(proveedorId);
      
        // Filtrar el proveedor a eliminar
        const index = producto.proveedor?.findIndex(proveedor =>
          proveedor.toString() === objectIdProveedorId.toString(),
        );
      
        if (index === undefined || index === -1) {
          throw new NotFoundException(`El proveedor con ID ${proveedorId} no está asociado al producto.`);
        }
      
        // Eliminar el proveedor del array
        producto.proveedor.splice(index, 1);
      
        // Guardar los cambios
        return await producto.save();
      }
      
      

    // async eliminarProveedorDeProducto(productoId: string, proveedorId: string): Promise<Productos> {
    //     // Verificamos la existencia del producto
    //     const producto = await this.productosModel.findById(productoId);
    //     if (!producto) {
    //         throw new NotFoundException(`Producto con id ${productoId} no encontrado`);
    //     }
    
    //     // Verificamos que el proveedor exista
    //     const proveedor = await this.proveedoresServices.findOne(proveedorId);
    //     if (!proveedor) {
    //         throw new NotFoundException(`Proveedor con id ${proveedorId} no encontrado`);
    //     }
    
    //     // Verificamos si el proveedor está asociado al producto
    //     const proveedorIndex = producto.proveedor.indexOf(proveedorId);
    //     if (proveedorIndex === -1) {
    //         throw new Error(`El proveedor no está asociado a este producto`);
    //     }
    
    //     // Eliminamos el proveedor de la lista
    //     producto.proveedor.splice(proveedorIndex, 1);
    
    //     // Guardamos los cambios en la base de datos
    //     return await producto.save();
    // }


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
         // Agregamos el cliente a la lista de cliente si no está ya agregado
        if (!producto.cliente.includes(clienteId)) {
            producto.cliente.push(clienteId);
        } else {
            throw new Error(`El cliente ya está asociado a este producto`);
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

        // Verificamos si el proveedor está asociado al producto
        const clientesIndex = producto.cliente.indexOf(clienteId);
        if (clientesIndex === -1) {
            throw new Error(`El proveedor no está asociado a este producto`);
        }
    
        // Eliminamos el proveedor de la lista
        producto.cliente.splice(clientesIndex, 1);
    
        // Guardamos los cambios en la base de datos
        return await producto.save();

    }

}