// users.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [HttpModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService], // Para usar en otros módulos
})
export class UsersModule {}