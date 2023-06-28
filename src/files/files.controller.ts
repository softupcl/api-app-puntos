import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileNamer,fileFilter } from './helpers';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService : ConfigService,

  ) {}


  @Get('producto/:nombreImagen')
  findProductoImagen(
    @Res() res: Response,
    @Param('nombreImagen')  nombreImagen: string
  ){

    const path= this.filesService.obtenerImagenProducto(nombreImagen);  
    res.sendFile(path);
  }


  @Post('producto')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/productos',
      filename: fileNamer
    })
  }))
  subirArchivo( 
    @UploadedFile() file: Express.Multer.File, 
  ){

    if(!file){
      throw new BadRequestException('Archivo no es una imagen válida');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/producto/${file.filename}`;

    return {
      secureUrl
    };
  }
}
