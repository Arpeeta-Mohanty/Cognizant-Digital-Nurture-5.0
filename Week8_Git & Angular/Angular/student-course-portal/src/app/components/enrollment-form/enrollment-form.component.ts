import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

// Hands-On 4: Template Driven Forms with validation
@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('enrollForm') enrollForm!: NgForm;

  private enrollmentService = inject(EnrollmentService);
  private courseService = inject(CourseService);
  private notificationService = inject(NotificationService);

  courses: Course[] = [];
  submitted = false;
  successMessage = '';

  departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Model object bound to the form via ngModel
  formData = {
    studentName: '',
    studentEmail: '',
    rollNumber: '',
    department: '',
    courseId: 0,
    courseName: '',
    semester: 0,
    enrollmentDate: new Date().toISOString().split('T')[0]
  };

  ngOnInit(): void {
    this.courseService.courses$.subscribe(c => this.courses = c);
    this.courseService.getCourses().subscribe();
  }

  // CanDeactivate guard: warn if form is dirty and not submitted
  canDeactivate(): boolean {
    if (this.enrollForm?.dirty && !this.submitted) {
      return false; // guard will show confirm dialog
    }
    return true;
  }

  onCourseChange(): void {
    const selected = this.courses.find(c => c.id === Number(this.formData.courseId));
    this.formData.courseName = selected?.title || '';
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
      this.submitted = false;
      return;
    }

    const enrollment: Omit<Enrollment, 'id'> = { ...this.formData };

    this.enrollmentService.enroll(enrollment).subscribe({
      next: () => {
        this.successMessage = `Successfully enrolled ${this.formData.studentName} in ${this.formData.courseName}!`;
        this.notificationService.success(this.successMessage);
        form.resetForm();
        this.formData.enrollmentDate = new Date().toISOString().split('T')[0];
        this.submitted = false;
      },
      error: () => {
        this.notificationService.error('Enrollment failed. Please try again.');
        this.submitted = false;
      }
    });
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.successMessage = '';
    this.submitted = false;
    this.formData.enrollmentDate = new Date().toISOString().split('T')[0];
  }
}
