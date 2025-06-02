import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ModulosService } from './modulos.service';

@Controller('modulos')
export class ModulosController {
     constructor(private readonly modulosService: ModulosService) { }


     @Post()
     create(@Body() data: any) {
          return this.modulosService.create(data);
     }

     @Post('asignar-a-empresa')
     asignar(@Body() data: any) {
          return this.modulosService.asignarModulos(data);
     }

     @Get('empresa/:empresa_id')
     obtener(
          @Param('empresa_id', ParseIntPipe) empresa_id: number,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          return this.modulosService.obtenerModulosPorEmpresa(empresa_id, Number(page), Number(limit));
     }

}
