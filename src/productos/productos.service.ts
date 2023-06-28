import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID} from 'uuid';


import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoImagen } from './entities';
import { User } from '../auth/entities/user.entity';


@Injectable()
export class ProductosService {

  private readonly logger = new Logger('ProductService');
  
  constructor (
    @InjectRepository(Producto)
    private readonly productoRepository:Repository<Producto>,

    @InjectRepository(ProductoImagen)
    private readonly productoImagenRepository:Repository<ProductoImagen>,

    private readonly dataSource : DataSource,


  ){}


  async create(createProductoDto: CreateProductoDto, usuario : User) {
    
    try {
      const {imagenes=[], ...productoDetalle} = createProductoDto;
      const producto = this.productoRepository.create({
        ...productoDetalle,
        imagenes:imagenes.map(imagen => this.productoImagenRepository.create({url: imagen})),
        usuario
      });

      await this.productoRepository.save(producto);

      return {...producto, imagenes};
      
    } catch (error) {
      this.handledExceptions(error);
    }

  }

  async findAll(paginacionDto: PaginacionDto) {
    
    const {limit = 10, offset=0 } = paginacionDto;
    
    const productos = await this.productoRepository.find({
      take:limit,
      skip: offset,
      relations: {
        imagenes: true, 
      }
      
    });
      
    return productos.map(producto => ({
      ...producto,
      imagenes : producto.imagenes.map(img => img.url)
    }));
  }

  async findOne(busqueda: string) {

    let producto: Producto;

    if(isUUID(busqueda)){
      producto = await this.productoRepository.findOneBy({id:busqueda});
    }else{
      const query = this.productoRepository.createQueryBuilder('prod');
      producto = await query
        .where(`UPPER(titulo)=:titulo or slug=:slug`,{
          titulo : busqueda.toLowerCase(),
          slug: busqueda.toLowerCase(),
        })
        .leftJoinAndSelect('prod.imagenes','prodImagenes')
        .getOne();
    }

    if(!producto)
      throw new NotFoundException(`Producto buscado con ${busqueda} no encontrado`)

    return producto;  
    
  }


  async findOnePlaine(busqueda: string){
    const {imagenes = [], ...rest } = await this.findOne(busqueda);
    return {
      ...rest,
      imagenes: imagenes.map(img => img.url)
    }
  }


 async update(id: string, updateProductoDto: UpdateProductoDto,usuario : User) {

    const {imagenes, ...rest} = updateProductoDto;
    const producto = await this.productoRepository.preload({id, ...rest  });

    if(!producto) throw new NotFoundException(`Producto con el id ${id} no encontrado`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
      
      if(imagenes){
        await queryRunner.manager.delete(ProductoImagen, {producto:{id}} )
        producto.imagenes = imagenes.map(img => this.productoImagenRepository.create({url:img}))
      }
     
      //await this.productoRepository.save(producto);
      producto.usuario = usuario;
      await queryRunner.manager.save(producto);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlaine(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handledExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }

  private handledExceptions(error: any){
    if(error.code ==='23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado, revisar logs del servidor');
  }

  
  async deleteAllProducts(){
    const query = this.productoRepository.createQueryBuilder('producto');

    try {
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handledExceptions(error);
    }
  }



}
