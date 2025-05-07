import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtMiddleware implements NestMiddleware {

     constructor(private readonly configService: ConfigService) {}

     use(req: any, res: any, next: () => void) {

          const token = req.headers['authorization']?.split(' ')[1];
          //console.log(token)
          if (!token) {
               return res.status(401).send('Token no proporcionado');
          }
          try {
               const secretKey = this.configService.get<string>('CLAVE_JWT');
               const decoded = jwt.verify(token, secretKey); 
               req.user = decoded; // Guarda la información del usuario en la solicitud
          } catch (error) {
               return res.status(401).send('Token inválido');
          }
          next();
     }
}