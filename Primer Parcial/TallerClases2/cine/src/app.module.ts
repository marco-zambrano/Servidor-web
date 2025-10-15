import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test',
      entities: [Usuario],
      synchronize: true,
    }),
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
