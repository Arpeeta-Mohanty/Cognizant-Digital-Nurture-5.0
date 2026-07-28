import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, FormGroup, FormArray,
  Validators, AbstractControl, ValidationErrors, AsyncValidatorFn
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Course } from '../../models/course.model';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

// ── Custom Synchronous Validator ──────────────────────────────────────────────
// Validates that roll number matches pattern CTS + 7 digits
function rollNumberValidator(control: AbstractControl): ValidationErrors | null {
  const pattern = /^[A-Z]{3}[0-9]{7}$/;
  return pattern.test(control.value) ? null : { invalidRollNumber: true };
}

// ── Custom Async Validator ────────────────────────────────────────────────────
// Simulates checking if email is already registered (server call)
function emailNotTakenValidator(): AsyncValidatorFn {
  const takenEmails = ['admin@portal.com', 'test@portal.com'];
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(takenEmails.includes(control.value)).pipe(
      delay(500), // simulate network delay
      map(isTaken => isTaken ? { emailTaken: true } : null)
    );
  };
}

// Hands-On 5: Reactive Forms
@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private courseService = inject(CourseService);
  private notificationService = inject(NotificationService);

  courses: Course[] = [];
  submitted = false;
  successData: any = null;

  departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];

  // FormGroup built with FormBuilder
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.courseService.courses$.subscribe(c => this.courses = c);
    this.courseService.getCourses().subscribe();
  }

  canDeactivate(): boolean {
    return this.form.pristine || !!this.successData;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      // Validators.compose chains multiple validators
      studentName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      // Async validator checks email availability
      studentEmail: ['', [Validators.required, Validators.email], [emailNotTakenValidator()]],

      rollNumber: ['', [Validators.required, rollNumberValidator]],

      department: ['', Validators.required],

      semester: [null, [Validators.required, Validators.min(1), Validators.max(8)]],

      enrollmentDate: [new Date().toISOString().split('T')[0], Validators.required],

      // FormArray: dynamic list of selected courses
      selectedCourses: this.fb.array([], Validators.required),

      // Nested FormGroup
      contactInfo: this.fb.group({
        phone: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
        address: ['', Validators.maxLength(200)]
      })
    });
  }

  // Getter for the FormArray
  get selectedCourses(): FormArray {
    return this.form.get('selectedCourses') as FormArray;
  }

  // Getter for nested group
  get contactInfo(): FormGroup {
    return this.form.get('contactInfo') as FormGroup;
  }

  // Helper to get a control for template use
  ctrl(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  // Check if a course is in the FormArray
  isCourseSelected(courseId: number): boolean {
    return this.selectedCourses.value.includes(courseId);
  }

  // Add/remove course from FormArray
  onCourseToggle(courseId: number, checked: boolean): void {
    if (checked) {
      this.selectedCourses.push(this.fb.control(courseId));
    } else {
      const idx = this.selectedCourses.value.indexOf(courseId);
      if (idx !== -1) this.selectedCourses.removeAt(idx);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitted = false;
      this.notificationService.warning('Please fix validation errors before submitting.');
      return;
    }

    this.successData = this.form.value;
    this.notificationService.success('Registration submitted successfully!');
    this.form.reset();
    this.submitted = false;
  }

  onReset(): void {
    this.form.reset({ enrollmentDate: new Date().toISOString().split('T')[0] });
    // Clear FormArray
    while (this.selectedCourses.length) this.selectedCourses.removeAt(0);
    this.successData = null;
  }

  // Check if a field has a specific error and has been touched
  hasError(fieldPath: string, error: string): boolean {
    const ctrl = this.form.get(fieldPath);
    return !!(ctrl?.hasError(error) && (ctrl.touched || ctrl.dirty));
  }

  isInvalid(fieldPath: string): boolean {
    const ctrl = this.form.get(fieldPath);
    return !!(ctrl?.invalid && (ctrl.touched || ctrl.dirty));
  }

  isValid(fieldPath: string): boolean {
    const ctrl = this.form.get(fieldPath);
    return !!(ctrl?.valid && (ctrl.touched || ctrl.dirty));
  }
}
