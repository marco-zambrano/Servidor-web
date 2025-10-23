// src/types/user.type.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ReservaType } from './reserva.type';
import { ReporteType } from './reporte.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id_usuario: string;

  @Field()
  nombre: string;

  @Field()
  correo: string;

  // La contraseña no se expone en GraphQL por seguridad
  // contrasena: string;

  @Field()
  rol: string;

  @Field(() => [ReservaType], { nullable: true })
  reservas?: ReservaType[];

  @Field(() => [ReporteType], { nullable: true })
  reportes?: ReporteType[];
}