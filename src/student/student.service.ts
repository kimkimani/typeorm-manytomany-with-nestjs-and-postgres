// student.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CourseService } from '../course/course.service'; // Import CourseService
import { Course } from '../course/course.entity'; // Import Course entity

@Injectable()

export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private courseService: CourseService,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>, // Inject Course repository
  ) {}

  async enrollStudentInCourses(studentId: number, courseIds: number[]): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'], // Load the courses relation for the student
    });

    if (!student) {
      throw new Error('Student not found');
    }

    const courses = await this.courseRepository.findByIds(courseIds); // Fetch courses by IDs

    if (!courses.length) {
      throw new Error('No courses found with the provided IDs');
    }

    student.courses = courses; // Assign fetched courses to the student

    return this.studentRepository.save(student); // Save the updated student
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async updateStudent(id: number, studentData: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, studentData);
    return this.getStudentById(id);
  }
  
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }


  async deleteStudent(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async createStudentWithCourses(name: string, courseIds: number[]): Promise<Student> {
    const student = this.studentRepository.create({ name });

    try {
      const courses = await this.courseRepository.findByIds(courseIds);

      if (courses.length !== courseIds.length) {
        throw new Error('One or more courses not found');
      }

      student.courses = courses;
      return this.studentRepository.save(student);
    } catch (error) {
      throw new Error(`Error creating student: ${error.message}`);
    }
  }
}
