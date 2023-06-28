import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{

        @IsString()
        @IsEmail()
        email: string;

        @IsString()
        @MinLength(6)
        @MaxLength(50)
        @Matches(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password debe contener una letra Mayúscula ,  miniscula y números'
        })
        password: string;

        @IsString()
        @MinLength(3)
        nombre: string;


}