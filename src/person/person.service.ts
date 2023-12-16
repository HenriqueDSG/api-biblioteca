/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { Attendant } from 'src/attendant/entities/attendant.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    @InjectRepository(Attendant) private readonly attendantRepository: Repository<Attendant>,
  ) {

  }

  async create(createPersonDto: CreatePersonDto) {
    const person = {
      name: createPersonDto.name,
      password: createPersonDto.password,
      email: createPersonDto.email,
      phone: createPersonDto.phone,
    }

    const personCreated = await this.personRepository.save(person);

    const address = {
      street: createPersonDto.street,
      number: createPersonDto.number,
      cep: createPersonDto.cep,
      city: createPersonDto.city,
      state: createPersonDto.state,
      country: createPersonDto.country,
      complement: createPersonDto.complement,
    }

    const addressCreated = await this.addressRepository.save(address);

    if (createPersonDto.isAttendant == 0) {
      await this.userRepository.query(`INSERT INTO usuarios (id_pessoa, id_endereco) VALUES (${personCreated.id}, ${addressCreated.id})`);
    }
    else {
      await this.attendantRepository.query(`INSERT INTO atendentes (id_pessoa, id_endereco) VALUES (${personCreated.id}, ${addressCreated.id})`);
    }
  }

  async findAll() {
    const result = await this.personRepository.query(`
        select * from (
          SELECT 
            user.id_usuario AS id_user_atendente,
            user.id_pessoa AS id_pessoa,
            user.id_endereco AS id_endereco,
            person.nome AS nome,
            person.password AS password,
            person.email AS email,
            person.telefone AS telefone,
            address.rua AS rua,
            address.numero AS numero,
            address.cep AS cep,
            address.cidade AS cidade,
            address.estado AS estado,
            address.pais AS pais,
            address.complemento AS complemento,
            0 isAttendant

          FROM usuarios user
          LEFT JOIN pessoas person ON person.id_pessoa = user.id_pessoa
          LEFT JOIN enderecos address ON user.id_endereco = address.id_endereco
        
          UNION
        
          SELECT 
            attendant.id_atendente AS id_user_atendente,
            attendant.id_pessoa AS id_pessoa,
            attendant.id_endereco AS id_endereco,
            person.nome AS nome,
            person.password AS password,
            person.email AS email,
            person.telefone AS telefone,
            address.rua AS rua,
            address.numero AS numero,
            address.cep AS cep,
            address.cidade AS cidade,
            address.estado AS estado,
            address.pais AS pais,
            address.complemento AS complemento,
            1 isAttendant

          FROM atendentes attendant 
          LEFT JOIN pessoas person ON person.id_pessoa = attendant.id_pessoa
          LEFT JOIN enderecos address ON attendant.id_endereco = address.id_endereco) as dados
        order by nome;
      `);

    return result;
  }

  async findOne(id: number) {
    const result = await this.personRepository.query(`
        select * from (
          SELECT 
            user.id_usuario AS id_user_atendente,
            user.id_pessoa AS id_pessoa,
            user.id_endereco AS id_endereco,
            person.nome AS nome,
            person.password AS password,
            person.email AS email,
            person.telefone AS telefone,
            address.rua AS rua,
            address.numero AS numero,
            address.cep AS cep,
            address.cidade AS cidade,
            address.estado AS estado,
            address.pais AS pais,
            address.complemento AS complemento,
            0 isAttendant

          FROM usuarios user
          LEFT JOIN pessoas person ON person.id_pessoa = user.id_pessoa
          LEFT JOIN enderecos address ON user.id_endereco = address.id_endereco
        
          UNION
        
          SELECT 
            attendant.id_atendente AS id_user_atendente,
            attendant.id_pessoa AS id_pessoa,
            attendant.id_endereco AS id_endereco,
            person.nome AS nome,
            person.password AS password,
            person.email AS email,
            person.telefone AS telefone,
            address.rua AS rua,
            address.numero AS numero,
            address.cep AS cep,
            address.cidade AS cidade,
            address.estado AS estado,
            address.pais AS pais,
            address.complemento AS complemento,
            1 isAttendant

          FROM atendentes attendant 
          LEFT JOIN pessoas person ON person.id_pessoa = attendant.id_pessoa
          LEFT JOIN enderecos address ON attendant.id_endereco = address.id_endereco) as dados
        where id_pessoa = ${id}
        order by nome;
      `);

    return result[0];
  }

  async findUsers() {
    const result = await this.personRepository.query(`
      SELECT 
        user.id_usuario AS id,
        person.nome AS name

      FROM usuarios user
      LEFT JOIN pessoas person ON person.id_pessoa = user.id_pessoa
      order by person.nome;
    `);

    return result;
  }

  async findAttendants() {
    const result = await this.personRepository.query(`
      SELECT 
        atendente.id_atendente AS id,
        person.nome AS name

      FROM atendentes atendente
      LEFT JOIN pessoas person ON person.id_pessoa = atendente.id_pessoa
      order by person.nome;
    `);

    return result;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = {
      name: updatePersonDto.name,
      password: updatePersonDto.password,
      email: updatePersonDto.email,
      phone: updatePersonDto.phone,
    }

    await this.personRepository.update(updatePersonDto.idPerson, person);

    const address = {
      street: updatePersonDto.street,
      number: updatePersonDto.number,
      cep: updatePersonDto.cep,
      city: updatePersonDto.city,
      state: updatePersonDto.state,
      country: updatePersonDto.country,
      complement: updatePersonDto.complement,
    }

    await this.addressRepository.update(updatePersonDto.idAddress, address);

    if (updatePersonDto.isAttendant == 0) {
      const user = {
        idPerson: updatePersonDto.idPerson,
        idAddress: updatePersonDto.idAddress,
      }

      await this.userRepository.update(id, user);
    }
    else {
      const attendant = {
        idPerson: updatePersonDto.idPerson,
        idAddress: updatePersonDto.idAddress,
      }

      await this.attendantRepository.update(id, attendant);
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    const teste = await this.findOne(id);

    if (teste.isAttendant == "0") {
      await this.userRepository.delete(id);
    }
    else {
      await this.attendantRepository.delete(id);
    }

    await this.personRepository.delete(id);

    return { message: "Person deleted successfully" };
  }
}