import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtMiddleware implements NestMiddleware {
     use(req: any, res: any, next: () => void) {

          const token = req.headers['authorization']?.split(' ')[1];
          
          if (!token) {
               return res.status(401).send('Token no proporcionado');
          }
          try {
               const decoded = jwt.verify(token, process.env.CLAVE_JWT); 
               req.user = decoded; // Guarda la información del usuario en la solicitud
          } catch (error) {
               return res.status(401).send('Token inválido');
          }
          next();
     }
}