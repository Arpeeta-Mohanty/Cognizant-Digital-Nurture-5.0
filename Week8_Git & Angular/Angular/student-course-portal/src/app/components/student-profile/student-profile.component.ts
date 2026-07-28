import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private courseService = inject(CourseService);

  student: Student = {
    id: 1,
    name: 'Arpeeta Mohanty',
    email: 'arpeeta@example.com',
    rollNumber: 'CTS2025001',
    department: 'Computer Science',
    semester: 6,
    enrolledCourses: [],
    gpa: 3.8
  };

  enrolledCourses: Course[] = [];

  ngOnInit(): void {
    this.courseService.courses$.subscribe(courses => {
      this.enrolledCourses = courses.filter(c => c.enrolled);
      this.student.enrolledCourses = this.enrolledCourses.map(c => c.id);
    });
    this.courseService.getCourses().subscribe();
  }

  get totalCredits(): number {
    return this.enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
  }

  get averageRating(): number {
    if (!this.enrolledCourses.length) return 0;
    return this.enrolledCourses.reduce((sum, c) => sum + c.rating, 0) / this.enrolledCourses.length;
  }
}
