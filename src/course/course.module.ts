import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Module({
  imports: [
     // Import the Course entity into the module `TypeOrmModule`
    TypeOrmModule.forFeature([Course]),
  ],

  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule {}
