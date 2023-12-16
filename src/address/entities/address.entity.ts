/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'enderecos' })
export class Address {
    @PrimaryGeneratedColumn({ name: 'id_endereco' })
    id: number;

    @Column({ name: 'rua' })
    street: string;

    @Column({ name: 'numero' })
    number: number;

    @Column({ name: 'cep' })
    cep: string;

    @Column({ name: 'cidade' })
    city: string;

    @Column({ name: 'estado' })
    state: string;

    @Column({ name: 'pais' })
    country: string;

    @Column({ name: 'complemento' })
    complement: string;
}