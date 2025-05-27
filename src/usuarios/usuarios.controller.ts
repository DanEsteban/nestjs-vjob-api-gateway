import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, Req, UnauthorizedException } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";


@Controller('usuarios')
export class UsuariosController {

     constructor(
          private readonly usuariosService: UsuariosService,
     ) { }

     @Get()
     findAll(
          @Req() req: Request,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
          @Query('search') search?: string,
     ) {
          const empresa = req['empresa'];
          return this.usuariosService.findAll(empresa.id, Number(page), Number(limit), search);
     }

     @Post()
     create(@Req() req: Request, @Body() body: any) {
          const empresa = req['empresa'];
          return this.usuariosService.create({ ...body, empresa_id: empresa.id });
     }

     @Patch(':id')
     update(@Req() req: Request, @Param('id', ParseIntPipe) id: number, @Body() body: any) {
          const empresa = req['empresa'];
          return this.usuariosService.update(id, { ...body, empresa_id: empresa.id });
     }

     @Delete(':id')
     delete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
          const empresa = req['empresa'];
          return this.usuariosService.delete(id, empresa.id);
     }
}
