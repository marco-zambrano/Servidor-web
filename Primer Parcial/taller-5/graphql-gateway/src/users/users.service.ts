import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserType } from '../types/user.type';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<UserType[]> {
    const response = await firstValueFrom(
      this.httpService.get('/users')
    );
    return response.data;
  }

  async findOne(id: string): Promise<UserType> {
    const response = await firstValueFrom(
      this.httpService.get(`/users/${id}`)
    );
    return response.data;
  }
}
