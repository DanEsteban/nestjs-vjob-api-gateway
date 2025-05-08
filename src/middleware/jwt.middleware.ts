import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

     constructor(private readonly configService: ConfigService) {}

     use(req: any, res: any, next: () => void) {
          const authHeader = req.headers['authorization'];
          if (!authHeader) {
               return res.status(401).send('Token no proporcionado');
          }

          const token = authHeader.split(' ')[1];
          if (!token) {
               return res.status(401).send('Token no proporcionado');
          }

          try {
               const secretKey = this.configService.get<string>('CLAVE_JWT');
               if (!secretKey) {
                    throw new Error('Clave JWT no configurada');
               }

               // Verificar el token y su expiración
               const decoded = jwt.verify(token, secretKey); // Lanza un error si el token ha expirado
               req.user = decoded; // Guarda la información del usuario en la solicitud
               next(); // Continúa con la siguiente función middleware
          } catch (error) {
               if (error.name === 'TokenExpiredError') {
                    return res.status(401).send('Token expirado');
               }
               return res.status(401).send('Token inválido');
          }
     }
}