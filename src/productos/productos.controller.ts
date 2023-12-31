import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { Auth, GetUser } from '../auth/decorators';
import { RolesValidos } from '../auth/interfaces/roles-validos';
import { User } from '../auth/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiResponse({status: 201 , description: 'Producto ha sido creado', type: Producto})
  @ApiResponse({status: 400 , description: 'Bad request'})
  @ApiResponse({status: 403 , description: 'Token no válido'})
  @Auth(RolesValidos.admin)
  create(
    @Body() createProductoDto: CreateProductoDto,
    @GetUser() usuario : User,

  ) {
    return this.productosService.create(createProductoDto, usuario);
  }

  @Get()
  findAll(@Query() paginacionDto: PaginacionDto) {
    console.log(paginacionDto);
    return this.productosService.findAll(paginacionDto);
  }

  @Get(':busqueda')
  findOne(@Param('busqueda') busqueda: string) {
    return this.productosService.findOnePlaine(busqueda);
  }

  @Patch(':id')
  @Auth(RolesValidos.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductoDto: UpdateProductoDto,
    @GetUser() usuario : User,
  ) {
    return this.productosService.update(id, updateProductoDto,usuario);
  }


  @Delete(':id')
  @Auth(RolesValidos.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
