/* eslint-disable prettier/prettier */
import { Person } from "src/person/entities/person.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'atendentes' })
export class Attendant extends Person {
    @PrimaryGeneratedColumn({ name: 'id_atendente' })
    id: number;

    @Column({ name: 'data_contratacao' })
    dateHired: Date;

    @Column({ name: 'id_endereco' })
    idAddress: number;

    @Column({ name: 'id_pessoa' })
    idPerson: number;
}