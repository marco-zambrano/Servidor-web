import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { PeliculasModule } from './peliculas/peliculas.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'cinest.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, //solo en desarrollo
    logging: true, //para debug
}), UsersModule, SalasModule, PeliculasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
