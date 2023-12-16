/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'registros' })
export class Registry {
    @PrimaryGeneratedColumn({ name: 'id_registro' })
    id: number;

    @Column({ name: 'data_criacao' })
    creationDate: Date;

    @Column({ name: 'data_entrega' })
    deliveryDate: Date;

    @Column({ name: 'data_entrega_previsao' })
    expectedDeliveryDate: Date;

    @Column({ name: 'id_usuario' })
    idUser: number;

    @Column({ name: 'id_livro' })
    idBook: number;

    @Column({ name: 'id_atendente' })
    idAttendant: number;
}