import { Module } from '@nestjs/common';
import { RolPermisosService } from './rol-permisos.service';
import { RolPermisosController } from './rol-permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { RolPermiso } from './entities/rol-permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolPermiso, Rol, Permiso])],
  controllers: [RolPermisosController],
  providers: [RolPermisosService],
  exports: [RolPermisosService],
})
export class RolPermisosModule {}
