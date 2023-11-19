// course.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<Course> {
    return this.courseService.getCourseById(+id);
  }

  @Post()
  async createCourse(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.courseService.createCourse(courseData);
  }

  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() courseData: Partial<Course>,
  ): Promise<Course> {
    return this.courseService.updateCourse(+id, courseData);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return this.courseService.deleteCourse(+id);
  }
}
