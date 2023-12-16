/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { UpdateRegistryDto } from './dto/update-registry.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';

@Injectable()
export class RegistryService {
  constructor(@InjectRepository(Registry) private registryRepository: Repository<Registry>) {

  }

  async create(createRegistryDto: CreateRegistryDto) {
    const registry = this.registryRepository.create(createRegistryDto);
    return await this.registryRepository.save(registry);
  }

  async findAll() {
    // return await this.registryRepository.find();

      const result = await this.registryRepository.query(`
      select 
        registro.id_registro as id,
        livro.id_livro as idBook,
        livro.titulo as titleBook,
        usuario.id_usuario as idUser,
        pessoa_usuario.nome as nameUser,
        atendente.id_atendente as idAttendant,
        pessoa_atendente.nome as nameAttendant,
        registro.data_entrega as deliveryDate,
        registro.data_entrega_previsao as expectedDeliveryDate

      from registros registro
      left join usuarios usuario on registro.id_usuario = usuario.id_usuario
      left join pessoas pessoa_usuario on usuario.id_pessoa = pessoa_usuario.id_pessoa
      left join atendentes atendente on registro.id_atendente = atendente.id_atendente
      left join pessoas pessoa_atendente on atendente.id_pessoa = pessoa_atendente.id_pessoa
      left join livros livro on registro.id_livro = livro.id_livro
    `);

      return result;


    // return this.registryRepository
    //   .createQueryBuilder('registro')
    //   .select([
    //     'registro.id_registro as id',
    //     'livro.id_livro as idBook',
    //     'livro.titulo as titleBook',
    //     'usuario.id_usuario as idUser',
    //     'pessoa_usuario.nome as nameUser',
    //     'atendente.id_atendente as idAttendant',
    //     'pessoa_atendente.nome as nameAttendant',
    //     'registro.data_entrega as deliveryDate',
    //     'registro.data_entrega_previsao as expectedDeliveryDate',
    //   ])
    //   .leftJoin('registro.id_usuario', 'usuario')
    //   .leftJoin('usuario.id_pessoa', 'pessoa_usuario')
    //   .leftJoin('registro.id_atendente', 'atendente')
    //   .leftJoin('atendente.id_pessoa', 'pessoa_atendente')
    //   .leftJoin('registro.id_livro', 'livro')
    //   .getRawMany();

  }

  async findOne(id: number) {
    // return await this.registryRepository.findBy({ id: id });

    const result = await this.registryRepository.query(`
      select 
        registro.id_registro as id,
        livro.id_livro as idBook,
        livro.titulo as titleBook,
        usuario.id_usuario as idUser,
        pessoa_usuario.nome as nameUser,
        atendente.id_atendente as idAttendant,
        pessoa_atendente.nome as nameAttendant,
        registro.data_entrega as deliveryDate,
        registro.data_entrega_previsao as expectedDeliveryDate

      from registros registro
      left join usuarios usuario on registro.id_usuario = usuario.id_usuario
      left join pessoas pessoa_usuario on usuario.id_pessoa = pessoa_usuario.id_pessoa
      left join atendentes atendente on registro.id_atendente = atendente.id_atendente
      left join pessoas pessoa_atendente on atendente.id_pessoa = pessoa_atendente.id_pessoa
      left join livros livro on registro.id_livro = livro.id_livro
      where registro.id_registro = ${id}
    `);

    return result[0];
  }

  async getRegistryByBookId(id: number) {
    const result = await this.registryRepository.query(`select * from registros where id_livro = ${id}`);
    return result;
  }

  async getRegistryByPersonId(id: number) {
    const result = await this.registryRepository.query(`
      select registro.* from registros registro 
      left join usuarios usuario on registro.id_usuario = usuario.id_usuario
      left join atendentes atendente on registro.id_atendente = atendente.id_atendente
      where usuario.id_pessoa = ${id} or atendente.id_pessoa = ${id}
    `);

    return result;
  }

  async update(id: number, updateRegistryDto: UpdateRegistryDto) {
    // await this.registryRepository.update(id, updateRegistryDto);
    let query = `
        update registros 
        set 
          id_livro = ${updateRegistryDto.idBook}, 
          id_usuario = ${updateRegistryDto.idUser}, 
          id_atendente = ${updateRegistryDto.idAttendant}, 
          data_entrega_previsao = '${updateRegistryDto.expectedDeliveryDate}'`;

    if (updateRegistryDto.deliveryDate) {
      query += `, data_entrega = '${updateRegistryDto.deliveryDate}'`;
    }
    else {
      query += `, data_entrega = null`;
    }

    query += ` where id_registro = ${id}`;

    const result = await this.registryRepository.query(query);

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.registryRepository.delete(id);
    return { message: "Registry deleted successfully" };
  }
}