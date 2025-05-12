import { Body, Controller, Get, Inject, Post, Req, UnauthorizedException } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import * as jwt from 'jsonwebtoken';


@Controller('autenticacion')
export class UsuariosController {


     constructor(
          private readonly usuariosService: UsuariosService,
          @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

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

          // const token = respuesta.token;

          // if (token) {
          //      try {
          //           // Decodificar el token JWT
          //           const secretKey = 'jwt_super_secreto';
          //           const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload; // Verificar y decodificar el token
                    
          //           const cache = await this.cacheManager.get(`${decoded['id']}`);
          //           //console.log(decoded, cache)
          //           // if (!cache) {
          //           //      throw new UnauthorizedException('Token no encontrado en caché o expirado');
          //           // }

          //           // //console.log('Token decodificado:', decoded);
          //           // console.log('Datos en caché:', cache);
                    
          //      } catch (error) {
          //           console.error('Error al decodificar el token:', error.message);
          //           throw new UnauthorizedException('Token inválido');
          //      }
          // }
          return respuesta;
     }
}
