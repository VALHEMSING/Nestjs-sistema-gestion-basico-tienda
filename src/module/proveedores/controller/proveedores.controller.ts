import { 
    Controller, 
    Post, 
    Body, 
    Delete, 
    Param, 
    NotFoundException, 
    Get, 
    Put,
    Patch
} from '@nestjs/common';

import { ProveedoresServices } from '../service/proveedores.service';
import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';
import { Proveedores } from '../schema/proveedores.schema';

@Controller('proveedores')
export class ProveedoresController{


    constructor(private readonly proveedoresServies: ProveedoresServices)
    {

    }
    


    //Controlador para crear el Proveedor
    @Post()
    async craete(@Body() createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
        return  this.proveedoresServies.createProveedor(createProveedorDto);
    }


    //Controlador para desactivar
    @Put('deactive/:id')
    async deactive(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.deactive(id);
    }


     //Controlador para Activar
    @Put('active/:id')
    async active(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.active(id);
    }



    //Controlador para eliminar
    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.delete(id);
    }


    //Controlador para obtener todos los proveedores
    @Get()
    async findAll(): Promise<Proveedores[]>{
        return await this.proveedoresServies.findAll();
    }


    //Controlador para obtener por id
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Proveedores>{
        return await this.proveedoresServies.findOne(id)
    }


    //Controlador para actualizar todo el proveedor
    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updateProveedor = await this.proveedoresServies.update(id, updateProveedoresDto);
        if(!updateProveedor){
            throw new NotFoundException(`Proveedor con Id ${id} no se encontro`);
        }
        return updateProveedor;
    }

    @Patch('updatePartial/:id')
    async updatePartial(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updatePartialProveedor = await this.proveedoresServies.updatePartial(id, updateProveedoresDto);
        if(!updatePartialProveedor){
            throw new NotFoundException(`Proveedor con Id ${id} no se encontro`);
        }
        return updatePartialProveedor;
    }

}
