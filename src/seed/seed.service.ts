import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosService } from '../productos/productos.service';
import { initialData } from './data/data';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
 
  constructor(
    private readonly productosService: ProductosService,

    @InjectRepository(User)
    private readonly usuarioRepositorio: Repository<User>
  ){}


  async ejecutarSemilla(){

    await this.borrarTablas();
    const usuarioAdmin = await this.insertarUsuarios();
    await this.insertarProductos(usuarioAdmin);
    return 'Semilla creada';
  }

  
  private async borrarTablas(){
    await this.productosService.deleteAllProducts();
    
    const queryBuilder = this.usuarioRepositorio.createQueryBuilder();
    await queryBuilder
        .delete()
        .where({})
        .execute()
  }  

  private async insertarUsuarios(){
    const usuariosDatos = initialData.usuarios;

    const usuarios: User[] = [];

    usuariosDatos.forEach(usuario => {
      usuarios.push(this.usuarioRepositorio.create(usuario))
    });
    
     const dbUsuario= await this.usuarioRepositorio.save(usuariosDatos);
     
     return dbUsuario[0];

  }
    

  private async insertarProductos (usuarioAdmin:User){

      await this.productosService.deleteAllProducts();
      
      const productos = initialData.productos;
      const insertTempProductos = [];
      
        productos.forEach(producto =>{
          insertTempProductos.push(this.productosService.create(producto, usuarioAdmin));
        });

      await Promise.all(insertTempProductos);
      return true;

  } 


}
