import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmpresaService } from '../empresa/empresa.service';
import { RolesService } from '../roles/roles.service';
import { ModulosService } from '../modulos/modulos.service';
import { PermisosService } from '../permisos/permisos.service';
import { RolPermisosService } from '../rol-permisos/rol-permisos.service';

// Importa cada seeder individual
import { seedEmpresa } from './seed-empresa';
import { seedRoles } from './seed-roles';
import { seedPermisos } from './seed-permisos';
import { seedModulos } from './seed-modulo';
import { seedRolPermisos } from './seed-roles-permisos';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { seedUsuarios } from './seed-usuario';


async function runSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const empresaService = app.get(EmpresaService);
  const empresaRepository = app.get('EmpresaRepository'); // Repositorio de la empresa
  const rolesService = app.get(RolesService);
  const modulosService = app.get(ModulosService);
  const permisosService = app.get(PermisosService);
  const rolPermisoService = app.get(RolPermisosService);
  const usuarioService = app.get(UsuariosService);

  try {
    // Ejecuta los seeders en el orden correcto
    await seedModulos(modulosService); 
    await seedPermisos(permisosService, modulosService);
    await seedEmpresa(empresaService); 
    await seedRoles(rolesService, empresaService);
     // Crear permisos
    
    await seedRolPermisos(rolPermisoService, rolesService, permisosService); // Asignar permisos a roles
    await seedUsuarios(usuarioService, empresaService, rolesService); // Crear usuarios

    console.log('✅ Seeders ejecutados con éxito');
  } catch (error) {
    console.error('❌ Error al ejecutar los seeders:', error.message);
  } finally {
    await app.close();
  }

  await app.close();
}

runSeeders();
// "seed": "ts-node -r tsconfig-paths/register src/database/seed.ts"
//npm run seed