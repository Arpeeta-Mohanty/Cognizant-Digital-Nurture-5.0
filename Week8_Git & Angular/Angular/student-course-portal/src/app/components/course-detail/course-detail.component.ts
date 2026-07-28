import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

// Hands-On 7: Route params | Hands-On 8: HTTP with switchMap
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  course: Course | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    // switchMap cancels previous request if route param changes
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.courseService.getCourseById(id).pipe(
          catchError(() => of(undefined))
        );
      })
    ).subscribe(course => {
      this.loading = false;
      if (course) {
        this.course = course;
      } else {
        this.error = 'Course not found.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  onEnroll(): void {
    if (this.course) {
      this.courseService.toggleEnrollment(this.course.id);
      this.course = { ...this.course, enrolled: !this.course.enrolled };
    }
  }
}
