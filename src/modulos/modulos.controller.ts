import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ModulosService } from './modulos.service';

@Controller('modulos')
export class ModulosController {
     constructor(private readonly modulosService: ModulosService) { }

     @Get('empresa')
     obtenerModulosEmpresa(
          @Query('empresa_id') empresa_id: number,
          @Req() req: any,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          const user = req.user;
          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al ver modulos como superadministrador.');
               }
               return this.modulosService.obtenerModulosEmpresa(empresa_id);
          }
          // Usuario normal
          return this.modulosService.obtenerModulosEmpresa(user.empresa_id);
     }

     @Get()
     obtenerModulos(
          @Req() req: any,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          const user = req.user;

          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               return this.modulosService.obtenerModulos(page, limit);
          }

          throw new ForbiddenException('Solo el superadministrador puede listar todos los módulos.');
     }

}
