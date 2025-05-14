import { Module } from '@nestjs/common';
import { EmpresaModulosService } from './empresa-modulos.service';
import { EmpresaModulosController } from './empresa-modulos.controller';

@Module({
  controllers: [EmpresaModulosController],
  providers: [EmpresaModulosService],
})
export class EmpresaModulosModule {}
