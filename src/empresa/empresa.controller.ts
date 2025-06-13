import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('empresas')
export class EmpresaController {
     constructor(
          private readonly empresaService: EmpresaService,
     ) { }

     @Post()
     @UseInterceptors(FileInterceptor('logo'))
     async crearEmpresa(
          @Body() data: any,
          @UploadedFile() file: Express.Multer.File,
     ): Promise<any> {
          return this.empresaService.create(data, file);
     }


     // Activar empresa (solo superadmin)
     @Patch(':id/activar')
     async activarEmpresa(@Param('id') id: number) {
          const empresa = await this.empresaService.activarEmpresa(id);
          return empresa;
     }

     // Desactivar empresa (solo superadmin)
     @Patch(':id/desactivar')
     async desactivarEmpresa(@Param('id') id: number) {
          const empresa = await this.empresaService.desactivarEmpresa(id);
          return empresa;
     }


     @Get()
     async listarEmpresas(
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ): Promise<any> {
          return this.empresaService.listarEmpresas(Number(page), Number(limit));
     }

     @Post('modulos')
     asignar(@Body() data: any) {
          return this.empresaService.asignarModulos(data);
     }

     @Put(':id')
     @UseInterceptors(FileInterceptor('logo'))
     async actualizarEmpresa(
          @Param('id', ParseIntPipe) id: number,
          @Body() body: any,
          @UploadedFile() file: Express.Multer.File,
     ) {

          return this.empresaService.actualizarEmpresa(id, body, file);
     }
}