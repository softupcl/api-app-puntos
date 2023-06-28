import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly usuarioRepository:Repository<User>,
    private readonly jwtService: JwtService,

  ){}

  async create(createUserDto: CreateUserDto) {
     try {

      const {password, ...useruserData} = createUserDto;

      const usuario = this.usuarioRepository.create({
        ...useruserData,
        password : bcrypt.hashSync(password,10)
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.password;

      return {
        ...usuario,
        token: this.getJwtToken({id: usuario.id})
      };
      
     } catch (error) {
        this.handleDBErrors(error);
     }
  }


  async loginUser(loginUserDto : LoginUserDto){
      const {email, password} = loginUserDto;

      const usuario = await this.usuarioRepository.findOne({
        where: {email},
        select: {email: true, password:true, nombre: true ,id:true, apellido:true, telefono: true, avatar:true, roles:true}
      });

      if(!usuario){
        throw new UnauthorizedException('Credenciales no válidas (email)');
      }
      
      if(!bcrypt.compareSync(password, usuario.password)){
        throw new UnauthorizedException('Credenciales no válidas (password)');
      }


      return {
        ...usuario,
        token: this.getJwtToken({id: usuario.id})
      };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const{password, ...dataUsuario} = updateUserDto;
    
    const usuarioActualizado = await this.usuarioRepository.preload({id, ...dataUsuario  });

    if(!usuarioActualizado) throw new NotFoundException(`Usuario con el id ${id} no encontrado`);

    const usuario = this.usuarioRepository.create({
      ...dataUsuario,
      ...usuarioActualizado,
      password : password != null ? bcrypt.hashSync(password,10) : password 
    });

    await this.usuarioRepository.save(usuario);
    delete usuario.password;

    return {
      ...usuario,
      token: this.getJwtToken({id: usuario.id})
    };
    
   } catch (error) {
      this.handleDBErrors(error);
   }


  private getJwtToken(payload : JwtPayload){
    
    const token = this.jwtService.sign(payload);
    return token;

  }


  private handleDBErrors(error: any) : never{
    if(error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    
    throw new InternalServerErrorException('Por favor revisar logs servidor');
  }
  
}
