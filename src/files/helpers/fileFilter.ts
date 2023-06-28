export const fileFilter=(req:Express.Request, file:Express.Multer.File, callback:Function)=>{

    if(!file) return callback( new Error('Archivo vacio'),false);

    const extensionArchivo = file.mimetype.split('/')[1];
    const validarExtension =['jpg','jpeg','png','gif'];

    if(validarExtension.includes(extensionArchivo)){
        return callback(null, true);
    }

    callback(null,false);

}