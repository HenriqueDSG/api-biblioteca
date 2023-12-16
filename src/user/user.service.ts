/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {

  }

  async create(createUserDto: CreateUserDto) {
    const User = this.userRepository.create(createUserDto);
    return await this.userRepository.save(User);
  }

  async findAll() {
    // return await this.userRepository.find();

    const result = await this.userRepository.query(`
      select 
        user.id_usuario,
        user.id_pessoa,
        user.id_endereco,
        person.nome,
        person.password,
        person.email,
        person.telefone,
        address.rua,
        address.numero,
        address.cep,
        address.cidade,
        address.estado,
        address.pais,
        address.complemento

      from usuarios user
      left join pessoas person on person.id_pessoa = user.id_pessoa
      left join enderecos address on user.id_endereco = address.id_endereco`);

    return result;
  }

  async findOne(userId: number) {
    // return await this.userRepository.findBy({ id: id });

    const result = await this.userRepository.query(`
      select 
        user.id_usuario,
        user.id_pessoa,
        user.id_endereco,
        person.nome,
        person.password,
        person.email,
        person.telefone,
        address.rua,
        address.numero,
        address.cep,
        address.cidade,
        address.estado,
        address.pais,
        address.complemento

      from usuarios user
      left join pessoas person on person.id_pessoa = user.id_pessoa
      left join enderecos address on user.id_endereco = address.id_endereco
      where user.id_usuario = ${userId}`);

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const person = {
    //   name: updateUserDto.name,
    //   password: updateUserDto.password,
    //   email: updateUserDto.email,
    //   phone: updateUserDto.phone,
    // }

    // await this.personRepository.update(updateUserDto.idPerson, person);

    // const address = {
    //   street: updateUserDto.street,
    //   number: updateUserDto.number,
    //   cep: updateUserDto.cep,
    //   city: updateUserDto.city,
    //   state: updateUserDto.state,
    //   country: updateUserDto.country,
    //   complement: updateUserDto.complement,
    // }

    // await this.addressRepository.update(updateUserDto.idAddress, address);

    // const user = {
    //   idPerson: updateUserDto.idPerson,
    //   idAddress: updateUserDto.idAddress,
    // }

    // await this.userRepository.update(id, user);

    // return await this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: "User deleted successfully" };
  }
}