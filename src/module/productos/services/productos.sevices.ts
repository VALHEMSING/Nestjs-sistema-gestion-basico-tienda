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


    
}