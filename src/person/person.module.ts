/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { UserModule } from 'src/user/user.module';
import { AddressModule } from 'src/address/address.module';
import { AttendantModule } from 'src/attendant/attendant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), AddressModule, UserModule, AttendantModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [TypeOrmModule]
})

export class PersonModule {}