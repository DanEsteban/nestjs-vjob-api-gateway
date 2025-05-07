import { IsOptional, IsString } from "class-validator";

export class CreateEmpresaDto {
  @IsString()
  nombre: string;

  @IsString()
  ruc: string;

  @IsString()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  logo_url?: string; 

  @IsString()
  dominio: string;
}


