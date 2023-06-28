import {v4 as uuid} from 'uuid';

export const fileNamer=(req:Express.Request, file:Express.Multer.File, callback:Function)=>{

    if(!file) return callback( new Error('Archivo vacio'),false);

    const extensionArchivo = file.mimetype.split('/')[1];
    
    const nombreArchivo =`${uuid()}.${ extensionArchivo }`;


    callback(null, nombreArchivo);

}