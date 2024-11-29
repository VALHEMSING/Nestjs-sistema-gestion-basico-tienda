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
import { ProductosServices } from '../services/productos.services';
import { CreateProductoDto } from '../dto/create-productos.dto';
import { UpdateProductosDto } from '../dto/udpate-productos.dto';
import { Productos } from '../schema/productos.schema';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgregarProveedorAProductoDto } from '../dto/agregarProveedorAProducto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosControllers{
    constructor(private readonly productosServices: ProductosServices){

    }

    @Post()
    @ApiOperation({ summary: 'Crear un producto' })
    @ApiBody({
        description: 'Datos del producto a crear',
        examples:{
            example:{
                value:{
                    nombre_producto: "Nombre Producto",
                    cantidad: 100,
                    precio: 1.0000
                }
            }
        }
    })
    async create(@Body() createProductosDto: CreateProductoDto): Promise<Productos> {
        return this.productosServices.createProducto(createProductosDto);
    }

    @Put('deactive/:id')
    async deactive(@Param('id') id: string): Promise<void>{
        await this.productosServices.deactive(id);
    }

    @Put('active/:id')
    async active(@Param('id') id: string): Promise<void>{
        await this.productosServices.active(id);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<void>{
        await this.productosServices.delete(id);
    }


    @Get()
    async findAll(): Promise<Productos[]>{
        return await this.productosServices.findAllProdutos();
    }


    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Productos>{
        console.log('ID recibido:', id); // Agrega esto para depurar
        return await this.productosServices.findOne(id);
    }

    @Put('update/:id')
    async udpate(@Param('id') id: string, @Body() updateProductosDto: UpdateProductosDto): Promise<Productos>{
        const updateProducto = await this.productosServices.udpate(id, updateProductosDto);
        if(!updateProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return updateProducto
    }

    @Patch('updatePartial/:id')
    async udpatePartial(@Param('id') id: string, @Body() updateProductosDto: UpdateProductosDto): Promise<Productos>{
        const updatePartialProducto = await this.productosServices.udpatePartial(id, updateProductosDto);
        if(!updatePartialProducto){
            throw new NotFoundException(`Producto con Id ${id} no se encontro`);
        }
        return updatePartialProducto
    }

    // Ruta para agregar un proveedor a un producto
   // Ruta para agregar un proveedor a un producto
   @Post('producto/:id/proveedor/:proveedorId')
   @ApiOperation({ summary: 'Agregar uno o varios proveedores a un producto' })
   @ApiParam({ name: 'id', required: true, description: 'ID del producto' })
   @ApiParam({ name: 'proveedorId', required: true, description: 'ID del proveedor a agregar' })
   async agregarProveedores(
       @Param('id') id: string,
       @Param('proveedorId') proveedorId: string
   ): Promise<Productos> {
       return await this.productosServices.addProveedorToProducto(id, proveedorId);
   }
  



    @Patch(':productoId/proveedores/:proveedorId/eliminar')
    @ApiOperation({ summary: 'Eliminar un proveedor de un producto' })
    @ApiParam({ name: 'productoId', description: 'ID del producto', type: String })
    @ApiParam({ name: 'proveedorId', description: 'ID del proveedor a eliminar', type: String })
    @ApiResponse({
      status: 200,
      description: 'Proveedor eliminado del producto correctamente.',
      type: Productos,
    })
    @ApiResponse({
      status: 404,
      description: 'Producto o proveedor no encontrado.',
    })
    async eliminarProveedorProducto(
      @Param('productoId') productoId: string,
      @Param('proveedorId') proveedorId: string,
    ): Promise<Productos> {
      return await this.productosServices.eliminarProveedorDeProducto(productoId, proveedorId);
    }
    

    @Patch(':productoId/clientes/:clienteId')
    async agregarClienteAProducto(@Param('productoId') productoId: string,@Param('clienteId') clienteId: string): Promise<Productos>{
        
        return await this.productosServices.agregarClientesAProducto(productoId, clienteId);
    }

    @Patch(':productoId/clientes/:clienteId/eliminar')
    async eliminarCLienteDeProducto(@Param('productoId') productoId: string, @Param('clienteId') clienteId: string): Promise<Productos>{
        return await this.productosServices.eliminarClientesDeProducto(productoId, clienteId);
    }

}