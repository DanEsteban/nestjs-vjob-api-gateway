import { Module } from '@nestjs/common';
import { DominioMiddleware } from './dominio.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';
import { JwtMiddleware } from './jwt.middleware';
import { PermisosMiddleware } from './permisos.middleware';

@Module({
     imports: [
          TypeOrmModule.forFeature([Empresa]),
     ],
     providers: [DominioMiddleware, JwtMiddleware, PermisosMiddleware],
     exports: [DominioMiddleware, TypeOrmModule, JwtMiddleware, PermisosMiddleware],
})
export class MiddlewareModule { }