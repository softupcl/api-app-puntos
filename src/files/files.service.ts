import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {
 
    obtenerImagenProducto(nombreImagen : string){

        const path = join(__dirname,'../../static/productos', nombreImagen);
        if(!existsSync(path)){
            throw new BadRequestException(`Producto no econtrado con imagen ${nombreImagen}` );
        }

        return path;

    }

}
