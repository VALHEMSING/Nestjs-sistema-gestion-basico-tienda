import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Productos } from '../schema/productos.schema';
import { CreateProductosDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/udpate-productos.dto';

@Injectable()
export class ProductosServices{
    constructor(@InjectModel(Productos.name) private productosModel: Model<Productos>)
    {

    }

    async createProducto(createProductosDto: CreateProductosDto): Promise<Productos>
    {
        const createProducto = new this.productosModel(createProductosDto);
        return createProducto.save();
    }


    async findAllProdutos(): Promise<Productos[]>{
        const findAllProdutos = await this.productosModel.find().populate('Proveedores').exec();
        return findAllProdutos;
    }


    async findOne(id: string): Promise<Productos>{
        const findOneProducto = await this.productosModel.findById(id).exec();
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



}