import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      entities: [User],
      logging: false,
      migrations: [],
      subscribers: [],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
