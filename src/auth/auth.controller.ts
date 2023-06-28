import { Controller, Get, Post, Body,  UseGuards, Req, SetMetadata, Patch, ParseUUIDPipe, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RawHeaders,GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';
import { LoginUserDto,CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { UseRoleGuard } from './guards/use-role.guard';
import { RolesValidos } from './interfaces';
import { UpdateUserDto } from './dto/update.user.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUsuario(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Put(':id')
  //@Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto,
    //@GetUser() usuario : User,
  ) {
    return this.authService.update(id, updateUserDto);
  }


/*

  @Get('privado')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request:Express.Request
    @GetUser() usuario: User,
    @GetUser('email') emailUsuario : string, 
    @RawHeaders() rawHeaders: string[]
  ){
    return {
      ok: true,
      msg:"Hola Mundo privado",
      usuario,
      emailUsuario,
      rawHeaders
    }
  }

  @Get('piola')
  @RoleProtected(RolesValidos.superAdmin, RolesValidos.admin)
  @UseGuards(AuthGuard(), UseRoleGuard)
  piolaRuta(
    @GetUser() usuario: User
  ){
    return {
      ok:"true",
      usuario
    }
  }

  @Get('fondeado')
  @Auth(RolesValidos.admin)
  fondeaRuta(
    @GetUser() usuario: User
  ){
    return {
      ok:"true",
      usuario
    }
  }
*/
  
}
