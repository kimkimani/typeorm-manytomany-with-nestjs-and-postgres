// student.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Put(':id/courses')
  async enrollStudentInCourses(
    @Param('id') id: string,
    @Body() body: { courses: number[] },
  ): Promise<any> {
    const studentId = +id;
    const courseIds = body.courses;

    try {
      const updatedStudent = await this.studentService.enrollStudentInCourses(studentId, courseIds);
      return { message: 'Student enrolled in courses successfully', data: updatedStudent };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error enrolling student in courses', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(+id);
  }

  @Post()
  async createStudent(@Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentService.createStudent(studentData);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentData: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.updateStudent(+id, studentData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<void> {
    return this.studentService.deleteStudent(+id);
  }
}
