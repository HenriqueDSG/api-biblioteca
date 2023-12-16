/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    idUser: number;

    idPerson: number;
    name: string;
    password: string;
    email: string;
    phone: string;

    idAddress: number;
    street: string;
    number: number;
    cep: string;
    city: string;
    state: string;
    country: string;
    complement: string;
}
