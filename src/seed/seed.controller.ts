import { Controller, Get } from '@nestjs/common';
import { RolesValidos } from '../auth/interfaces';
import { Auth } from '../auth/decorators';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
    
    @Get()
    //@Auth(RolesValidos.admin)
    ejecutarSemilla(){
      return this.seedService.ejecutarSemilla() 
    }
  
}
