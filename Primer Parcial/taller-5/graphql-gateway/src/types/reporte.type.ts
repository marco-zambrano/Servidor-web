import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class ReporteType {
    @Field(() => ID)
    id_reporte: string;

    @Field()
    fecha_generacion: Date;

    @Field(() => UserType, { nullable: true })
    admin?: UserType;
}
