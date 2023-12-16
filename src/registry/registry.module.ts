/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';
import { Book } from 'src/book/entities/book.entity';
import { BookModule } from 'src/book/book.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registry]), BookModule, PersonModule],
  controllers: [RegistryController],
  providers: [RegistryService],
})

export class RegistryModule {}