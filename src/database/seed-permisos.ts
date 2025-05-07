import { ModulosService } from "src/modulos/modulos.service";
import { PermisosService } from "../permisos/permisos.service";

export async function seedPermisos(permisoService: PermisosService, moduloService: ModulosService) {
     const nombreModulo = 'Facturacion';
     const permisos = ['Crear Factura', 'Eliminar Factura', 'Editar Factura', 'Ver Factura'];

     const modulo = await moduloService.findByName(nombreModulo);
     if (!modulo) {
          throw new Error(`ℹ️ El módulo "${nombreModulo}" no existe. Por favor, crea el módulo antes de asignar permisos.`);
     }

     for (const nombrePermiso of permisos) {
          const yaExiste = await permisoService.findByName(nombrePermiso);

          if (!yaExiste) {
               const slug = `${nombrePermiso.toLowerCase().replace(/\s+/g, '.')}`;

               await permisoService.create({
                    nombre: nombrePermiso,
                    slug: slug,
                    modulo_id: modulo.id,
               });

               console.log(`✅ Permiso "${nombrePermiso}" creado con éxito`);
          } else {
               console.log(`ℹ️ El Permiso "${nombrePermiso}" ya existe`);
          }
     }
}
