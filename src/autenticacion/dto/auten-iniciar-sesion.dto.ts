import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class AutenticacionIniciarSesionDto {
     @IsString({ message: 'El usuario debe ser una cadena de texto.' })
     @MinLength(4, { message: 'El usuario debe tener al menos 4 caracteres.' })
     @MaxLength(20, { message: 'El usuario no puede tener más de 20 caracteres.' })
     usuario: string;
     
     @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
     @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
     @MaxLength(32, { message: 'La contraseña no puede tener más de 32 caracteres.' })
     password: string;

     @IsNumber()
     @IsNotEmpty()
     empresa_id: number;
}