import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareModule } from './middleware/middleware.module';
import { DominioMiddleware } from './middleware/dominio.middleware';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { EmpresaModule } from './empresa/empresa.module';
import { PermisosMiddleware } from './middleware/permisos.middleware';
import { EmpresaModulosModule } from './empresa-modulos/empresa-modulos.module';
import { RolesModule } from './roles/roles.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ModulosModule } from './modulos/modulos.module';
import { PermisosService } from './permisos/permisos.service';
import { PermisosController } from './permisos/permisos.controller';
import { PermisosModule } from './permisos/permisos.module';
import { SuperAdminMiddleware } from './middleware/super-admin.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 24 * 60 * 60 * 1000, // 1 día en segundos
    }),
    MiddlewareModule,
    EmpresaModule,
    UsuariosModule,
    EmpresaModulosModule,
    RolesModule,
    AutenticacionModule,
    ModulosModule,
    PermisosModule,
  ],
  controllers: [AppController, PermisosController],
  providers: [AppService, PermisosService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DominioMiddleware) // Aplica el DominioMiddleware
      .forRoutes('*') // Aplica a todas las rutas
      .apply(JwtMiddleware) // Aplica el JwtMiddleware
      .exclude('/autenticacion/iniciar-sesion') // Excluye la ruta de login
      .forRoutes('*')
      .apply(SuperAdminMiddleware)
      .forRoutes(
        { path: 'empresas', method: RequestMethod.ALL },
        { path: 'empresas/modulos', method: RequestMethod.ALL },
        { path: 'empresas/:id', method: RequestMethod.ALL },
        { path: 'empresas/:id/activar', method: RequestMethod.ALL },
        { path: 'empresas/:id/desactivar', method: RequestMethod.ALL },
      )
    // .apply(PermisosMiddleware)
    // .exclude('/autenticacion/iniciar-sesion')
    // .forRoutes('*'); 
  }
}


