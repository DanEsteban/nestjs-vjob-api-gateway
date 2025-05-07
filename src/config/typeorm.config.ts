import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
     type: 'mysql',
     host: configService.get<string>('DB_HOST', 'localhost'),
     port: configService.get<number>('DB_PORT', 3306),
     username: configService.get<string>('DB_USERNAME', 'root'),
     password: configService.get<string>('DB_PASSWORD', ''),
     database: configService.get<string>('DB_NAME', 'nestjs-vjob'),
     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
     synchronize: configService.get<boolean>('DB_SYNC', true),
});