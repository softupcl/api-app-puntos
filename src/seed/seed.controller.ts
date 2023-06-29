import { Controller, Get } from '@nestjs/common';
import { RolesValidos } from '../auth/interfaces';
import { Auth } from '../auth/decorators';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Semilla de datos')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
    
    @Get()
    //@Auth(RolesValidos.admin)
    ejecutarSemilla(){
      return this.seedService.ejecutarSemilla() 
    }
  
}
