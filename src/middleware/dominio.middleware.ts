import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class DominioMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
    
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Obtener el dominio desde el encabezado 'host'
    const host = req.headers.host || '';
    const dominio = host.split(':')[0];

    if (!dominio) {
      throw new UnauthorizedException('No se pudo determinar el dominio de la solicitud');
    }

    //Buscar la empresa por el dominio
    const empresa = await this.empresaRepo.findOne({ where: { dominio } });
    if (!empresa) {
      throw new UnauthorizedException(`El dominio "${host}" no está registrado`);
    } 

    //Verificar si la empresa está activa
    if (!empresa.estado) {
      throw new UnauthorizedException(`La empresa asociada al dominio "${host}" no está activa`);
    }

    req['empresa'] = {
      id: empresa.id,
      dominio: empresa.dominio,
      urlUsuarios: this.configService.get<string>('URL_USUARIOS'),
    };
    next();
  }
}