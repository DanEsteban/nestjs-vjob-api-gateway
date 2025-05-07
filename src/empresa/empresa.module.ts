import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Empresa } from './entities/empresa.entity';
import { MiddlewareModule } from '../middleware/middleware.module';

@Module({
     imports: [
          TypeOrmModule.forFeature([Empresa]),
          MiddlewareModule,
     ],
     controllers: [EmpresaController],
     providers: [EmpresaService],
})
export class EmpresaModule { }
