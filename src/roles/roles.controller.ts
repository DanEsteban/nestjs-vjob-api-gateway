import { BadRequestException, Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Request } from 'express';

@Controller('roles')
export class RolesController {
     constructor(private readonly rolesService: RolesService) { }

     @Post()
     crearRol(
          @Body() body: any,
          @Req() req: any,
     ) {
          const user = req.user;

          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               // Es superadmin, debe enviar empresa_id en el body
               if (!body.empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al crear un rol como superadministrador.');
               }
               return this.rolesService.crearRol(body);
          }

          // Usuario normal: NO debe enviar empresa_id, tú lo pones aquí.
          const { empresa_id, ...rest } = body;
          const bodyWithEmpresa = { ...rest, empresa_id: user.empresa_id };
          return this.rolesService.crearRol(bodyWithEmpresa);
     }

     @Get()
     listarPorEmpresa(
          @Query('empresa_id') empresa_id: number,
          @Req() req: any,
     ) {
          const user = req.user;

          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al ver modulos como superadministrador.');
               }
               return this.rolesService.listarPorEmpresa(empresa_id);
          }

          // Usuario normal
          return this.rolesService.listarPorEmpresa(user.empresa_id);
     }

     // @Get('empresa')
     // listarPorEmpresa(
     //      @Req() req: Request,
     //      @Query('page') page: number = 1,
     //      @Query('limit') limit: number = 10,
     // ) {
     //      const empresa = req['empresa'];
     //      return this.rolesService.listarPorEmpresa(empresa.id, Number(page), Number(limit));
     // }

     // @Get('permisos')
     // verPermisos(
     //      @Query('page') page: number = 1,
     //      @Query('limit') limit: number = 10,
     //      @Query('empresa_id') empresaId: number,
     //      @Req() req: any,
     // ) {
     //      const user = req.user;

     //      // Superadmin
     //      if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
     //           if (!empresaId) {
     //                throw new BadRequestException('Debe indicar empresa_id al ver permisos como superadministrador.');
     //           }
     //           return this.rolesService.obtenerPermisos({ empresa_id: empresaId }, Number(page), Number(limit));
     //      }

     //      // Usuario normal
     //      return this.rolesService.obtenerPermisos({ empresa_id: user.empresa_id }, Number(page), Number(limit));
     // }

     // @Put(':id/permisos')
     // async asignarPermisos(
     //      @Param('id', ParseIntPipe) rol_id: number,
     //      @Body() body: any,
     //      @Req() req: any,

     // ) {
     //      const user = req.user;
     //      const { permiso_ids } = body;

     //      if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
     //           return this.rolesService.asignarPermisos(rol_id, { permiso_ids });
     //      }

     //      // a) Obtienes IDs de módulos que tiene la empresa
     //      const modulos = await this.rolesService.obtenerModulosEmpresa(user.empresa_id);
     //      const modulosIds = modulos.map(m => m.id);

     //      // b) Obtienes permisos permitidos para esos módulos
     //      const permisosPermitidos = await this.rolesService.obtenerPermisosPorModulos(modulosIds);
     //      const idsPermitidos = permisosPermitidos.map(p => p.id);

     //      // c) Validar que TODOS los permiso_ids a asignar estén en los permitidos
     //      const permisosNoPermitidos = permiso_ids.filter(id => !idsPermitidos.includes(id));
     //      if (permisosNoPermitidos.length) {
     //           throw new ForbiddenException(
     //                `No puedes asignar los siguientes permisos: ${permisosNoPermitidos.join(', ')}`
     //           );
     //      }
     //      return this.rolesService.asignarPermisos(rol_id, { permiso_ids });

     // }

}

