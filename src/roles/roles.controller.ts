import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
     constructor(private readonly rolesService: RolesService) { }

     @Get()
     findAll(
          @Req() req: Request,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ) {
          const empresa = req['empresa'];
          return this.rolesService.findAll(empresa.id, Number(page), Number(limit));
     }
     
     @Post()
     create(
          @Body() body: any,
          @Req() req: Request,
     ) {
          const empresa = req['empresa'];
          return this.rolesService.create({ ...body, empresa_id: empresa.id });
     }

     @Patch(':id')
     update(
          @Param('id', ParseIntPipe) id: number,
          @Body() body: any,
          @Req() req: Request
     ) {
          const empresa = req['empresa'];
          return this.rolesService.update(id, { ...body, empresa_id: empresa.id });
     }

     @Delete(':id')
     delete(
          @Param('id', ParseIntPipe) id: number,
          @Req() req: Request,
     ) {
          const empresa = req['empresa'];
          return this.rolesService.desactivar(id, empresa.id);
     }
}
