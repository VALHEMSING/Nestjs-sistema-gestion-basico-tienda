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

// Importacion necesaria para documentar en swagger para los endpoints
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Proveedor') // Etiqueta para agrupar endpoints en la documentacion
@Controller('proveedores') // Ruta base
export class ProveedoresController{


    constructor(private readonly proveedoresServies: ProveedoresServices)
    {

    }
    


    //Controlador para crear el Proveedor
    @Post()
    // Descripción del endpoint
    @ApiOperation({summary: 'Crear un nuevo proveedor'}) 
    // Respuesta exitosa
    @ApiResponse({status: 201, description: 'El proveedor ha sido creado'}) 
    // Respueta de error
    @ApiResponse({status: 400, description: 'Solicitud incorrecta'})
    // Cuerpo del endpoint
    @ApiBody({
        description: 'Cuerpo de solicitud para crear un nuevo proveedor',
        examples:{
            example:{
                summary: 'Ejemplo de crearción',
                value:{
                    nombre_proveedor: 'Nombre__Proveedor',
                    email_proveedor: 'proveedor@gmail.com',
                    celular_proveedor: '1234567890'
                }
            }
        }
    })
    async craete(@Body() createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
        return  this.proveedoresServies.createProveedor(createProveedorDto);
    }


    //Controlador para desactivar
    @Put('deactive/:id')
    //Descripcion del endpoint
    @ApiOperation({summary:'Desctivar un proveedor'})
    //Respuesta exitosa
    @ApiResponse({status: 204, description: 'Proveedor desactivado'})
    //Resíesta de error
    @ApiResponse({status:400, description:'No se encuentra el proveedor'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Id del proveedor que desea desactivar',
        type: String,
    })
    async deactive(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.deactive(id);
    }


     //Controlador para Activar
    @Put('active/:id')
    //Descripcion del endpoint
    @ApiOperation({summary:'Activar un proveedor'})
    //Respuesta exitosa
    @ApiResponse({status: 204, description: 'Proveedor activado'})
    //Resíesta de error
    @ApiResponse({status:400, description:'No se encuentra el proveedor'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Id del proveedor que desea activar',
        type: String,
    })
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
