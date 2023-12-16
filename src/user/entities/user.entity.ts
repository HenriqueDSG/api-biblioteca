/* eslint-disable prettier/prettier */
import { Person } from "src/person/entities/person.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class User extends Person {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    id: number;

    @Column({ name: 'id_pessoa' })
    idPerson: number;

    @Column({ name: 'id_endereco' })
    idAddress: number;
}