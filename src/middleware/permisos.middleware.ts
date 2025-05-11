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

          console.log(nombreRuta, 'nombre ruta')

          if (!nombreRuta) {
               console.warn(`⚠️ Ruta no reconocida: ${metodo} ${urlActual}`);
               return res.status(404).send('Ruta no encontrada en definición');
          }

          const permisosEnCache = await this.cacheManager.get<{ permiso_nombre: string }[]>(`${usuario.id}`);

          console.log('permisos en cache', permisosEnCache)
          
          if (!permisosEnCache) {
               throw new UnauthorizedException('Sesion expirada');
          }

          const tienePermiso = permisosEnCache.some(
               (permiso: any) => permiso.permiso_nombre === nombreRuta
          );

          if (!tienePermiso) {
               return res.status(403).send('Acceso denegado: Permiso insuficiente');
          }

          next();
     }

     private matchRutaJson(urlActual: string, metodoActual: string, rutasJson: any[]): string | null {
          console.log(urlActual, metodoActual, rutasJson)
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