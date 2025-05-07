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

    //console.log(req.headers)

    if (!dominio) {
      throw new UnauthorizedException('No se pudo determinar el dominio de la solicitud');
    }

    //Buscar la empresa por el dominio
    const empresa = await this.empresaRepo.findOne({ where: { dominio } });
    if (!empresa) {
      throw new UnauthorizedException(`El dominio "${host}" no está registrado`);
    } 

    //console.log(req.headers.authorization)
    //Verificar si la empresa está activa
    if (!empresa.estado) {
      throw new UnauthorizedException(`La empresa asociada al dominio "${host}" no está activa`);
    }

    
    //supuestamente esto seria para comprobar el token de la empresa
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('No se proporcionó el token JWT');
    // }
    // const token = authHeader.split(' ')[1];

    // try {
    //   const secretKey = 'jwt_super_secreto'; // Usa tu secret real o una env var
    //   const decoded: any = jwt.verify(token, secretKey);

    //   // Verificar si el token está en caché (por el ID del usuario decodificado)
    //   const cache = await this.cacheManager.get(`${decoded.sub}`);
    //   if (!cache) {
    //     throw new UnauthorizedException('Token no encontrado en caché o expirado');
    //   }

    //   // Puedes guardar el usuario autenticado si lo deseas
    //   req['usuario'] = decoded;
    // } catch (error) {
    //   console.error('Error al verificar token en middleware:', error.message);
    //   throw new UnauthorizedException('Token inválido o expirado');
    // }


    req['empresa'] = {
      id: empresa.id,
      dominio: empresa.dominio,
      urlUsuarios: this.configService.get<string>('URL_USUARIOS'),
    };
    next();
  }
}