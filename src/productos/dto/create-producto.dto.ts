import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {

    @ApiProperty({
        description: 'Titulo del produto (unico)',
        nullable: false,
        minLength:3
    })
    @IsString()
    @MinLength(3)
    titulo : string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    precio:number;
    
    @ApiProperty()
    @IsString()
    descripcion:string;
    
    @ApiProperty()
    @IsString()
    @IsOptional() 
    slug?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?:number;

    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    tallas: string[];
    
    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    colores:string[];

    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags:string[];

    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    imagenes?:string[];

}
