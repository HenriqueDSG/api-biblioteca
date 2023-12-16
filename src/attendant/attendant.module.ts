/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { AttendantController } from './attendant.controller';
import { Attendant } from './entities/attendant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantController],
  providers: [AttendantService],
  exports: [TypeOrmModule]
})

export class AttendantModule {}