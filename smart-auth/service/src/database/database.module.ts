import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';

const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as any,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: process.env.DB_SYNCHRONIZE as any,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: false,
      }),
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
