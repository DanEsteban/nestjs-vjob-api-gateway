import { Module } from '@nestjs/common';
import { DominioMiddleware } from './dominio.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';
import { JwtMiddleware } from './jwt.middleware';

@Module({
     imports: [
          TypeOrmModule.forFeature([Empresa]),
     ],
     providers: [DominioMiddleware, JwtMiddleware],
     exports: [DominioMiddleware, TypeOrmModule, JwtMiddleware],
})
export class MiddlewareModule { }