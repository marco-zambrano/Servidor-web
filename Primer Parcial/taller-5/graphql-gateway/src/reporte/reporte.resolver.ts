import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ReporteService } from './reporte.service';
import { ReporteType } from '../types/reporte.type';
import { UserType } from '../types/user.type';
import { UsersService } from '../users/users.service';

@Resolver(() => ReporteType)
export class ReporteResolver {
    constructor(
        private readonly reporteService: ReporteService,
        private readonly usersService: UsersService,
    ) { }

    @Query(() => [ReporteType], { name: 'reportes' })
    findAll() {
        return this.reporteService.findAll();
    }

    @Query(() => ReporteType, { name: 'reporte' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.reporteService.findOne(id);
    }

    @ResolveField(() => UserType, { nullable: true })
    async admin(@Parent() reporte: ReporteType) {
        if (reporte.admin?.id_usuario) {
            return this.usersService.findOne(reporte.admin.id_usuario);
        }
        return null;
    }
}
