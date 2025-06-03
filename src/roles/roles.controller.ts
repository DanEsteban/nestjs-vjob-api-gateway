import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
     constructor(private readonly rolesService: RolesService) { }

     @Post()
     create(
          @Body() body: any,
          @Req() req: Request,
     ) {
          const empresa = req['empresa'];
          return this.rolesService.create({ ...body, empresa_id: empresa.id });
     }

     @Put(':id/permisos')
     async asignarPermisos(
          @Param('id', ParseIntPipe) id: number,
          @Body() body: any,
     ) {
          return this.rolesService.asignarPermisos(id, body);
     }

     @Get(':id/permisos')
     verPermisos(
          @Param('id', ParseIntPipe) id: number,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          return this.rolesService.obtenerPermisos(id, Number(page), Number(limit));
     }

     @Get('empresa')
     listarPorEmpresa(
          @Req() req: Request,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          const empresa = req['empresa'];
          return this.rolesService.listarPorEmpresa(empresa.id, Number(page), Number(limit));
     }
}
