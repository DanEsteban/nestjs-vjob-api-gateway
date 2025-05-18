import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) { }

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
    const respuesta = await this.autenticacionService.login(payload, empresa.urlUsuarios);

    return respuesta;
  }
}
