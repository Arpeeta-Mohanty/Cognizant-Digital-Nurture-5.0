import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading } from '../../store/course/course.selectors';

// Hands-On 6: Services + Hands-On 8: HTTP + Hands-On 9: NgRx
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private courseService = inject(CourseService);
  private notificationService = inject(NotificationService);

  // Selecting from NgRx store
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  loading$: Observable<boolean> = this.store.select(selectCoursesLoading);

  searchQuery = '';
  selectedCategory = 'All';
  sortBy: 'title' | 'rating' | 'credits' = 'title';
  categories = ['All', 'Frontend', 'Backend', 'Core CS', 'Database', 'Cloud', 'AI/ML'];

  ngOnInit(): void {
    // Dispatch action to load courses via NgRx Effect
    this.store.dispatch(CourseActions.loadCourses());
  }

  onEnroll(course: Course, event: Event): void {
    event.stopPropagation();
    this.store.dispatch(CourseActions.toggleEnrollment({ id: course.id }));
    const msg = course.enrolled ? `Unenrolled from ${course.title}` : `Enrolled in ${course.title}`;
    this.notificationService.success(msg);
  }

  onDelete(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Delete this course?')) {
      this.store.dispatch(CourseActions.deleteCourse({ id }));
    }
  }

  filterAndSort(courses: Course[]): Course[] {
    return courses
      .filter(c => {
        const matchSearch = c.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            c.instructor.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchCat = this.selectedCategory === 'All' || c.category === this.selectedCategory;
        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        if (this.sortBy === 'rating') return b.rating - a.rating;
        if (this.sortBy === 'credits') return b.credits - a.credits;
        return a.title.localeCompare(b.title);
      });
  }

  trackById(_: number, course: Course): number { return course.id; }
}
