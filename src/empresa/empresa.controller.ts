import { Controller, Get, Query, Req } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";

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
}