import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import rutas from '../config/rutas/empresa.routes.json';

@Injectable()
export class PermisosMiddleware implements NestMiddleware {

     constructor(
          @Inject(CACHE_MANAGER)
          private readonly cacheManager: Cache,
     ) { }

     async use(req: any, res: any, next: () => void) {
          const usuario = req.user;
          const metodo = req.method;
          const urlActual = req.baseUrl; // ej: /empresa/2

          const nombreRuta = this.matchRutaJson(urlActual, metodo, rutas);
          if (!nombreRuta) {
               console.warn(`⚠️ Ruta no reconocida: ${metodo} ${urlActual}`);
               return res.status(404).send('Ruta no encontrada en definición');
          }

          const permisosEnCache = await this.cacheManager.get<{ permiso_nombre: string }[]>(`${usuario.id}`);
          if (!permisosEnCache) {
               throw new UnauthorizedException('Sesion expirada');
          }

          const tienePermiso = permisosEnCache.some(
               (permiso: any) => permiso.permiso_slug === nombreRuta
          );

          if (!tienePermiso) {
               return res.status(403).send('Acceso denegado: Permiso insuficiente');
          }else{
               console.log('Permiso concedido');
          }

          next();
     }

     private matchRutaJson(urlActual: string, metodoActual: string, rutasJson: any[]): string | null {
          for (const ruta of rutasJson) {
               if (ruta.metodo !== metodoActual.toUpperCase()) continue;

               // Convertir ruta tipo /empresa/:id a regex: ^/empresa/[^/]+$
               const pattern = '^' + ruta.url.replace(/:[^/]+/g, '[^/]+') + '$';
               const regex = new RegExp(pattern);

               if (regex.test(urlActual)) {
                    return ruta.slug;
               }
          }
          return null;
     }

}