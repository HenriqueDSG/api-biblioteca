/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';
import { Attendant } from './entities/attendant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendantService {
  constructor(@InjectRepository(Attendant) private attendantRepository: Repository<Attendant>) {

  }

  async create(createAttendantDto: CreateAttendantDto) {
    const attendant = this.attendantRepository.create(createAttendantDto);
    return await this.attendantRepository.save(attendant);
  }

  async findAll() {
    // return await this.attendantRepository.find();

    const result = await this.attendantRepository.query(`
      select 
        atendente.id_atendente,
        atendente.data_contratacao,
        atendente.id_endereco,
        atendente.id_pessoa,
        pessoa.nome,
        pessoa.password,
        pessoa.email,
        pessoa.telefone
      from atendentes atendente
      left join pessoas pessoa on pessoa.id_pessoa = atendente.id_pessoa`);

    return result;
  }

  async findOne(id: number) {
    // return await this.attendantRepository.findBy({ id: id });

    const result = await this.attendantRepository.query(`
      select 
        atendente.id_atendente,
        atendente.data_contratacao,
        atendente.id_endereco,
        atendente.id_pessoa,
        pessoa.nome,
        pessoa.password,
        pessoa.email,
        pessoa.telefone
      from atendentes atendente
      left join pessoas pessoa on pessoa.id_pessoa = atendente.id_pessoa
      where atendente.id_atendente = ${id}`);

    return result;
  }

  async update(id: number, updateAttendantDto: UpdateAttendantDto) {
    await this.attendantRepository.update(id, updateAttendantDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.attendantRepository.delete(id);
    return { message: "Attendant deleted successfully" };
  }
}