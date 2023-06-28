import { BadRequestException, Injectable, InternalServerErrorException, createParamDecorator } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository:Repository<Categoria>,
  ){}


  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return {
        ok: true,
        categoria
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll( paginacionDto: PaginacionDto ) {
      
     const {limit=10, offset=0}  = paginacionDto;
     
     const categorias = await this.categoriaRepository.find({
      take:limit,
      skip: offset,
     }); 

     return {
      ok: true,
      categorias
     }

  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }


  private handleDBErrors(error: any) : never{
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    
    throw new InternalServerErrorException('Por favor revisar logs servidor');
  }
  


}
