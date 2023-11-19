// course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async getCourseById(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } });
  }
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData);
    return this.courseRepository.save(course);
  }

  async updateCourse(id: number, courseData: Partial<Course>): Promise<Course> {
    await this.courseRepository.update(id, courseData);
    return this.getCourseById(id);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
