import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";


@Controller('usuarios')
export class UsuariosController {

     constructor(
          private readonly usuariosService: UsuariosService,
     ) { }

     @Post()
     crearUsuario(
          @Req() req: any,
          @Body() body: any
     ) {
          const user = req.user;
          //SuperAdmin 
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!body.empresa_id) {
                    throw new BadRequestException('Falta el empresa_id');
               }
               return this.usuariosService.crearUsuario(body);
          }
          // Admin de empresa solo puede crear usuarios para SU empresa
          return this.usuariosService.crearUsuario({ ...body, empresa_id: user.empresa_id });
     }

     @Get()
     listarUsuariosporEmpresa(
          @Query('empresa_id') empresa_id: number,
          @Req() req: any,
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
          @Query('search') search?: string,
     ) {
          const user = req.user;

          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al ver a los usuarios como superadministrador.');
               }
               return this.usuariosService.listarUsuariosporEmpresa(empresa_id);
          }

          // Los demás usuarios solo pueden ver los de su empresa
          return this.usuariosService.listarUsuariosporEmpresa(user.empresa_id, Number(page), Number(limit), search);
     }

     @Patch(':id/activar')
     async activarUsuario(
          @Param('id') id: number,
          @Query('empresa_id') empresa_id: number,
          @Req() req: any
     ) {
          
          const user = req.user;

          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al activar a los usuarios como superadministrador.');
               }
               return this.usuariosService.activarUsuario(id, empresa_id);
          }

          // Los demás usuarios solo pueden ver los de su empresa
          return this.usuariosService.activarUsuario(id, user.empresa_id);

     }

     @Patch(':id/desactivar')
     async desactivarUsuario(
          @Param('id') id: number,
          @Query('empresa_id') empresa_id: number,
          @Req() req: any
     ) {
          
          const user = req.user;

          // Superadmin
          if (user.empresa_id === 1 && user.rol_nombre === 'Administrador') {
               if (!empresa_id) {
                    throw new BadRequestException('Debe indicar empresa_id al desactivar a los usuarios como superadministrador.');
               }
               return this.usuariosService.desactivarUsuario(id, empresa_id);
          }

          // Los demás usuarios solo pueden ver los de su empresa
          return this.usuariosService.desactivarUsuario(id, user.empresa_id);

     }

     // @Patch(':id')
     // update(@Req() req: Request, @Param('id', ParseIntPipe) id: number, @Body() body: any) {
     //      const empresa = req['empresa'];
     //      return this.usuariosService.update(id, { ...body, empresa_id: empresa.id });
     // }

     // @Delete(':id')
     // delete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
     //      const empresa = req['empresa'];
     //      return this.usuariosService.delete(id, empresa.id);
     // }
}
