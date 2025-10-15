import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';



@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) //creamos el constructor para inyectar el repositorio TypeORM
  private readonly usuarioRepo: Repository<Usuario>
) {

  }

  async create(createUsuarioDto: CreateUsuarioDto) { //Creamos el usuario
    const newUser = this.usuarioRepo.create(createUsuarioDto);
    return await this.usuarioRepo.save(newUser);
  }

  async findAll() {
    return await this.usuarioRepo.find();
  }

  async findOne(id_usuario: string) {
    const user =  await this.usuarioRepo.findOneBy({id_usuario}) //buscamos el usuario por id usando el repositorio
    if (!user) {
      throw new NotFoundException('No se encontro el usario ${id_usuario}'); //Error 400 genera
    }
    return user;
  }

  async update(id_usuario: string, updateUsuarioDto: UpdateUsuarioDto) { //actualizamos el usuario por id
    const user =  await this.usuarioRepo.findOneBy({id_usuario}) //buscamos el usuario por id usando el repositorio
    if (!user) {
      throw new NotFoundException(`No se encontro el usario con id: ${id_usuario}`); //Error 400 genera
    }
    this.usuarioRepo.update(id_usuario, updateUsuarioDto)
    return await this.usuarioRepo.findOneBy({id_usuario}); //se pone de nuevo por que se actualizo y hay que devolver el nuevo valor
  }
  

  async remove(id_usuario: string) { //eliminamos el usuario por id usando el repositorios
    const user = await this.findOne(id_usuario) //usamos el metodo findOne para verificar que el usuario existe
    await this.usuarioRepo.delete(id_usuario) //para borrar podemos usar delete, remove o softRemove, en este caso usamos delete
    return `El usuario con id: ${id_usuario} ha sido eliminado`;
  }
}
