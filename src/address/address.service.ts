/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {

  }

  async create(createAddressDto: CreateAddressDto) {
    const category = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(category);
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: number) {
    return await this.addressRepository.findBy({ id: id });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.update(id, updateAddressDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.addressRepository.delete(id);
    return { message: "Address deleted successfully" };
  }
}
