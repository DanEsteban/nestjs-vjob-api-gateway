import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
     constructor(private readonly rolesService: RolesService) { }

     @Get()
     findAll(@Req() req: Request) {
          const empresa = req['empresa'];
          return this.rolesService.findAll(empresa.id);
     }

     // @Get(':id')
     // findOne(@Param('id', ParseIntPipe) id: number) {
     //      return this.rolesService.findOne(id);
     // }

     @Post()
     create(@Req() req: Request, @Body() body: any) {
          const empresa = req['empresa'];
          return this.rolesService.create({ ...body, empresa_id: empresa.id });
     }


     @Patch(':id')
     update(@Req() req: Request, @Param('id', ParseIntPipe) id: number, @Body() body: any) {
          const empresa = req['empresa'];
          return this.rolesService.update(id, { ...body, empresa_id: empresa.id });
     }

     @Delete(':id')
     delete(@Param('id', ParseIntPipe) id: number) {
          return this.rolesService.desactivar(id);
     }

     @Put(':id/permisos')
     asignarPermisos(@Param('id', ParseIntPipe) id: number, @Body() body: { permiso_ids: number[] }) {
          return this.rolesService.asignarPermisos(id, body.permiso_ids);
     }

     @Delete(':id/permisos')
     removerPermisos(@Param('id', ParseIntPipe) id: number, @Body() body: { permiso_ids: number[] }) {
          return this.rolesService.removerPermisos(id, body.permiso_ids);
     }
}
