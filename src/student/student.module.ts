// src/student/student.module.ts

import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CourseService  } from '../course/course.service';
import { Course } from '../course/course.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Course]), // Import the Student entity into the module
  ],
  providers: [StudentService, CourseService],
  controllers: [StudentController]
})
export class StudentModule {}
