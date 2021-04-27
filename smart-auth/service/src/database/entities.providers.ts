import { Connection } from 'typeorm';
import { UserRepository } from '../repository/user.repository';

export const entitiesProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(UserRepository),
    inject: ['DATABASE_CONNECTION'],
  },
];
