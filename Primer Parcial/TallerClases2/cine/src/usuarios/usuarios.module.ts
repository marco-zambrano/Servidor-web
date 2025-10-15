import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Usuario])], //importamos el repositorio de Usuario para poder usarlo en el servicio
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [TypeOrmModule] //exportamos el repositorio para poder usarlo en otros modulos
})
export class UsuariosModule {}
