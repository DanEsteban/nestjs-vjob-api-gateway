import { Controller, Get, Query } from '@nestjs/common';
import { PermisosService } from './permisos.service';

@Controller('permisos')
export class PermisosController {
     constructor(
          private readonly permisoService: PermisosService
     ) { }

     @Get()
     async listarPermisos(
          @Query('modulo') modulo?: string,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ):  Promise<{ data: any[]; total: number }> {
          return this.permisoService.listar(modulo, Number(page), Number(limit));
     }
}
