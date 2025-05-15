import { Body, Controller, Get, Inject, Post, Req, UnauthorizedException } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";


@Controller('autenticacion')
export class UsuariosController {

     constructor(
          private readonly usuariosService: UsuariosService,
     ) { }

     @Post('iniciar-sesion')
     async login(
          @Body() credentials: { usuario: string; password: string },
          @Req() req: Request
     ) {

          const empresa = req['empresa'];
          if (!empresa) {
               throw new UnauthorizedException('No se pudo determinar la empresa asociada a la solicitud');
          }
          const payload = {
               ...credentials,
               empresa_id: empresa.id,
          };
          const respuesta = await this.usuariosService.login(payload, empresa.urlUsuarios);

          return respuesta;
     }

     
}
