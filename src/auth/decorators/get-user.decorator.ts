import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string , ctx:ExecutionContext)=>{

        console.log(data);

        const req = ctx.switchToHttp().getRequest();
        const usuario = req.user;

        if(!usuario) throw new InternalServerErrorException('Usuario no encontrado (req)');

        return (!data) ? usuario : usuario[data];
    }
);