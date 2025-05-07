import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
     type: 'mysql',
     database: 'mysql',

     seeds: ['src/database/seeds/**/*{.ts,.js}'],
     factories: ['src/database/factories/**/*{.ts,.js}']
};

export const dataSource = new DataSource(options);