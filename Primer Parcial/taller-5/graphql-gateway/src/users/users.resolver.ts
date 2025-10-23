import { Resolver, Query, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ReservaService } from '../reserva/reserva.service';
import { UserType } from '../types/user.type';
import { ReservaType } from '../types/reserva.type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly reservaService: ReservaService,
  ) {}

  @Query(() => [UserType], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [ReservaType], { nullable: true })
  async reservas(@Parent() user: UserType) {
    return this.reservaService.findByUsuario(user.id_usuario);
  }
}
