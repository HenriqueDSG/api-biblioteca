/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendantModule } from './attendant/attendant.module';
import { AddressModule } from './address/address.module';
import { BookModule } from './book/book.module';
import { PersonModule } from './person/person.module';
import { RegistryModule } from './registry/registry.module';
import { UserModule } from './user/user.module';
import { Attendant } from "./attendant/entities/attendant.entity";
import { Address } from "./address/entities/address.entity";
import { Book } from "./book/entities/book.entity";
import { Person } from "./person/entities/person.entity";
import { Registry } from "./registry/entities/registry.entity";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: 'root',
      database: 'projeto_a3000', 
      entities: [ Attendant, Address, Book, Person, Registry, User ],
      synchronize: false,
      logging: true,
    }),
    AttendantModule,
    AddressModule,
    BookModule,
    PersonModule,
    RegistryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }