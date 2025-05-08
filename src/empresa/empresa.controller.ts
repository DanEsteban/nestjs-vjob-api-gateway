import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('empresa')
export class EmpresaController {
     constructor(
          private readonly empresaService: EmpresaService,
     ) { }

     @Get()
     getEmpresas(
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
          @Param('id') id: string,
          @Body() body: any,
          @UploadedFile() file: Express.Multer.File,
     ) {

          return this.empresaService.update(id, body, file);
     }

     @Delete(':id')
     deleteEmpresa(@Param('id') id: string): Promise < any > {
          return this.empresaService.delete(id);
     }

}