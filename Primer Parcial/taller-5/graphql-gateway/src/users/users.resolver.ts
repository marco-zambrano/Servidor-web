import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UsersService } from './users.service';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }
}