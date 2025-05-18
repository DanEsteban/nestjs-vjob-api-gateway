import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('empresa')
export class EmpresaController {
     constructor(
          private readonly empresaService: EmpresaService,
     ) { }

     @Get()
     async getEmpresas(
          @Query('page') page: number = 1,
          @Query('limit') limit: number = 10,
     ): Promise<any> {
          return this.empresaService.findAll(Number(page), Number(limit));
     }

     @Post()
     @UseInterceptors(FileInterceptor('logo'))
     createEmpresa(
          @Body() data: any,
          @UploadedFile() file: Express.Multer.File,
     ): Promise<any> {
          return this.empresaService.create(data, file);
     }

     @Put(':id')
     @UseInterceptors(FileInterceptor('logo'))
     async updateEmpresa(
          @Param('id', ParseIntPipe) id: number,
          @Body() body: any,
          @UploadedFile() file: Express.Multer.File,
     ) {

          return this.empresaService.update(id, body, file);
     }

     @Delete(':id')
     deleteEmpresa(@Param('id', ParseIntPipe) id: number): Promise<any> {
          return this.empresaService.delete(id);
     }

}