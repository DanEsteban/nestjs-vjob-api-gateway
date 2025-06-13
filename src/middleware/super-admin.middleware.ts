import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

@Injectable()
export class SuperAdminMiddleware implements NestMiddleware {
     use(req: any, res: any, next: () => void) {
          // Aquí tienes el usuario ya en req.user gracias al JwtMiddleware
          const user = req.user;
          // Tu lógica: verifica si pertenece a la empresa principal (id=1) y/o su rol es 'superadmin'
          if (!(user && user.empresa_id === 1 && user.rol_nombre === 'Administrador')) {
               throw new ForbiddenException('Solo el super admin puede acceder a este recurso');
          }
          next();
     }
}