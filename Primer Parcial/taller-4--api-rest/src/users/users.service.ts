import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Creamos el constructor, en este vamos a inyectar el repositorio de TypeORM
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Creamos un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    // primeramente creamos
    const newUser = this.userRepository.create(createUserDto);
    // Luego guardamos
    return await this.userRepository.save(newUser);
  }

  // Buscamos todos los usuarios
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id_usuario: id});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // NotFoundException para que devuelva el objeto como 404
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    this.userRepository.update({ id_usuario: id } as any, updateUserDto);
    return await this.userRepository.findOneBy({ id_usuario: id });
  }

  async remove(id: string) {
    await this.findOne(id); // Nos aseguramos que el usuario existe
    return await this.userRepository.delete({ id_usuario: id } as any);
  }
}
