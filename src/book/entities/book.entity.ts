/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'livros' })
export class Book {
    @PrimaryGeneratedColumn({ name: 'id_livro' })
    id: number;

    @Column({ name: 'titulo' })
    title: string;

    @Column({ name: 'autor' })
    author: string;
}