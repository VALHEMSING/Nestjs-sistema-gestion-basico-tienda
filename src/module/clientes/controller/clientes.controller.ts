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
import { UpdateClientesDto } from '../dto/update-clientes.dto';
import { CreateClientesDto } from '../dto/create-clientes.dto';
import { ClientesService } from '../service/clientes.service';
import { Clientes } from '../schema/clientes.schema';

@Controller('clientes') // Define la ruta base
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Post()
    async create(@Body() createClientesDto: CreateClientesDto): Promise<Clientes> {
        return this.clientesService.createCliente(createClientesDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Clientes> {
        return await this.clientesService.findOne(id);
    }

    @Get()
    async findAll(): Promise<Clientes[]> {
        return await this.clientesService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClientesDto: UpdateClientesDto): Promise<Clientes> {
        const updatedCliente = await this.clientesService.update(id, updateClientesDto);
        if (!updatedCliente) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return updatedCliente;
    }

    @Patch(':id')
    async updatePartial(@Param('id') id: string, @Body() updateClientesDto: Partial<UpdateClientesDto>): Promise<Clientes> {
        const updatedPartialCliente = await this.clientesService.updatePartial(id, updateClientesDto);
        if (!updatedPartialCliente) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return updatedPartialCliente;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.clientesService.delete(id);
    }

    @Put('/:id')
    async deactivate(@Param('id') id: string): Promise<void> {
        await this.clientesService.deactivate(id);
    }
}
