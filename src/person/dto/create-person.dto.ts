/* eslint-disable prettier/prettier */

export class CreatePersonDto {
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

    isAttendant: number;
}
