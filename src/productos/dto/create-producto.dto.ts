import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {

    @IsString()
    @MinLength(3)
    titulo : string;

    @IsNumber()
    @IsPositive()
    precio:number;
    
    @IsString()
    descripcion:string;
    
    @IsString()
    @IsOptional() 
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?:number;

    @IsString({each: true})
    @IsArray()
    tallas: string[];
    
    @IsString({each: true})
    @IsArray()
    colores:string[];

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags:string[];

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    imagenes?:string[];

}
