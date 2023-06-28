import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto{
        @IsString()
        @MinLength(6)
        @MaxLength(50)
        @IsOptional()
        @Matches(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password debe contener una letra Mayúscula ,  miniscula y números'
        })
        password: string;

        @IsString()
        @MinLength(3)
        @IsOptional()
        nombre: string;

        @IsString()
        @IsOptional()
        @MinLength(3)
        apellido: string;

        @IsString()
        @IsOptional()
        avatar: string;

        @IsString()
        @IsOptional()
        @MinLength(9)
        telefono: string;
}