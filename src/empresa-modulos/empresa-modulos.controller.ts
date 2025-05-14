import { Controller } from '@nestjs/common';
import { EmpresaModulosService } from './empresa-modulos.service';

@Controller('empresa-modulos')
export class EmpresaModulosController {
  constructor(private readonly empresaModulosService: EmpresaModulosService) {}
}
