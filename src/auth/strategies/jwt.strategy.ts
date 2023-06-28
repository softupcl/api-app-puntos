import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){

    constructor(
        @InjectRepository(User)
        private readonly usuarioRepositorio: Repository<User>,
        configService: ConfigService

    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }    

    async validate(payload: JwtPayload):Promise<User>{
      
        const {id} = payload;    
        const usuario = await this.usuarioRepositorio.findOneBy({id});

        if(!usuario) throw new UnauthorizedException('Token no válido');

        if(!usuario.activo) throw new UnauthorizedException('Usuario se encuentra inactivo');

        return usuario;
    }

}