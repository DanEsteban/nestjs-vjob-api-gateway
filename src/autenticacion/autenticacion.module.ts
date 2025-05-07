import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Rol } from 'src/roles/entities/rol.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'jwt_super_secreto',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Usuario, Empresa, Rol])
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AutenticacionModule {}
