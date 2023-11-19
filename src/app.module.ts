import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // Use TypeOrmModule and difine the following database settings
  imports: [TypeOrmModule.forRoot({
    // The database TypreORM will communicate with
    "type":"postgres",
    // Where the database is hosted, local in this case
    "host":"localhost",
    // DB port
    "port":5432,
    // If you have a different db username, update is as such 
    "username":"postgres",
    // add your db password
    "password":"pass",
    // Ensure you have the datsbe created and add it here
    "database":"school",
    // Load entities. This should ramin the same and TypeORM will
    // Load the entities and represent them in your database
    "entities":[__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize":true
  }),
  StudentModule,
  CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
