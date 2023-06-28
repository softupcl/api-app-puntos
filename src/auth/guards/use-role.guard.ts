import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UseRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

      const validarRoles:string[] = this.reflector.get(META_ROLES,context.getHandler());

      if(!validarRoles) return true;
      if(validarRoles.length === 0) return true;

      const req = context.switchToHttp().getRequest();
      const usuario = req.user;

      if(!usuario) throw new BadRequestException('Usuario no encontrado');

      for (const role of usuario.roles) {
        if(validarRoles.includes(role)){
          return true;
        }
      }
  
      throw new ForbiddenException(
        `Usuario ${usuario.nombre} necesita un rol válido [${validarRoles}] `
      );  
    
  }
}
