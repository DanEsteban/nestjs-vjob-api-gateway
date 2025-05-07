import { Injectable } from '@nestjs/common';
import { Rol } from '../roles/entities/rol.entity';
import { Permiso } from '../permisos/entities/permiso.entity';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { UpdateRolPermisoDto } from './dto/update-rol-permiso.dto';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class RolPermisosService {

  constructor(
      @InjectRepository(RolPermiso)
      private readonly rolPermisoRepo: Repository<RolPermiso>,
      @InjectRepository(Rol)
      private readonly rolRepo: Repository<Rol>,
      @InjectRepository(Permiso)
      private readonly permisoRepo: Repository<Permiso>,

  ) { }

  async findByRolAndPermiso(rol_id: number, permiso_id: number): Promise<RolPermiso | null> {
    return this.rolPermisoRepo.findOne({
      where: { rol: { id: rol_id }, permiso: { id: permiso_id } },
    });
  }
  
  async asignarTodosLosPermisosAlRol(nombreRol: string, manager: EntityManager = this.rolRepo.manager) {
    const rol = await manager.findOne(Rol, { where: { nombre: nombreRol } });
    if (!rol) {
      throw new Error(`ℹ️ El rol "${nombreRol}" no existe. Por favor, crea el rol antes de asignar permisos.`);
    }
  
    const permisos = await manager.find(Permiso);
    if (!permisos.length) {
      throw new Error('ℹ️ No hay permisos disponibles. Por favor, crea permisos antes de asignarlos.');
    }
  
    const resultados = [];
    for (const permiso of permisos) {
      const yaExiste = await manager.findOne(RolPermiso, {
        where: { rol: { id: rol.id }, permiso: { id: permiso.id } },
      });
  
      if (!yaExiste) {
        const nuevo = manager.create(RolPermiso, { rol, permiso });
        await manager.save(RolPermiso, nuevo);
        resultados.push(`✅ Permiso "${permiso.nombre}" asignado al rol "${rol.nombre}"`);
      } else {
        resultados.push(`ℹ️ El permiso "${permiso.nombre}" ya está asignado al rol "${rol.nombre}"`);
      }
    }
  
    return resultados;
  }
  
  async create(createRolPermisoDto: CreateRolPermisoDto) {
    const { rol_id, permiso_id } = createRolPermisoDto;
    const rol = await this.rolRepo.findOne({ where: { id: rol_id } });
    if (!rol) {
      throw new Error('El rol especificado no existe');
    }
    const permiso = await this.permisoRepo.findOne({ where: { id: permiso_id } });
    if (!permiso) {
      throw new Error('El permiso especificado no existe');
    }
    const rolPermiso = this.rolPermisoRepo.create({
      rol,
      permiso,
    }); 

    return await this.rolPermisoRepo.save(rolPermiso);
  }


  findAll() {
    return `This action returns all rolPermisos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolPermiso`;
  }

  update(id: number, updateRolPermisoDto: UpdateRolPermisoDto) {
    return `This action updates a #${id} rolPermiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolPermiso`;
  }
}
