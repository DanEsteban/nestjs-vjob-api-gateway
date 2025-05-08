import { Module, MiddlewareConsumer } from '@nestjs/common';
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
      ttl: 300, // Tiempo de vida en segundos (5 minutos)
      max: 100, // Máximo número de elementos en caché
    }),
    MiddlewareModule,
    EmpresaModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DominioMiddleware) // Aplica el DominioMiddleware
      .forRoutes('*') // Aplica a todas las rutas
      .apply(JwtMiddleware) // Aplica el JwtMiddleware
      .exclude('/autenticacion/iniciar-sesion') // Excluye la ruta de logincluye la ruta de login
      .forRoutes('*'); // Aplica a todas las demás rutas   .forRoutes('*'); // Aplica a todas las demás rutas
  } 
}


