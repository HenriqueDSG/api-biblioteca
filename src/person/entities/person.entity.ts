/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pessoas' })
export class Person {
    @PrimaryGeneratedColumn({ name: 'id_pessoa' })
    id: number;

    @Column({ name: 'nome' })
    name: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'telefone' })
    phone: string;
}