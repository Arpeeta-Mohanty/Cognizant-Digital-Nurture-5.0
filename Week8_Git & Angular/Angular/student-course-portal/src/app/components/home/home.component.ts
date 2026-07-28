import {
  Component, OnInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

// Hands-On 1 & 2: Interpolation, Property Binding, Event Binding,
// Two-way Binding, ngModel, Lifecycle Hooks, @Input, @Output
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HighlightDirective, CreditLabelPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  // @Input — receives data from parent component
  @Input() welcomeMessage: string = 'Welcome to Student Course Portal';

  // @Output — emits events to parent component
  @Output() courseSelected = new EventEmitter<Course>();

  private courseService = inject(CourseService);
  private subscription!: Subscription;

  // Interpolation data
  portalName = 'Student Course Portal';
  currentYear = new Date().getFullYear();
  totalStudents = 1250;

  // Property binding data
  logoUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  isPortalActive = true;
  buttonDisabled = false;

  // Two-way binding with ngModel
  searchQuery = '';
  selectedCategory = 'All';

  // Event binding
  clickCount = 0;
  lastAction = 'None';

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories = ['All', 'Frontend', 'Backend', 'Core CS', 'Database', 'Cloud', 'AI/ML'];

  stats = {
    totalCourses: 0,
    enrolledCourses: 0,
    availableCourses: 0
  };

  // ngOnInit: runs once after component is initialized
  ngOnInit(): void {
    console.log('HomeComponent: ngOnInit called');
    this.subscription = this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
      this.updateStats();
    });
    this.courseService.getCourses().subscribe();
  }

  // ngOnChanges: runs when @Input properties change
  ngOnChanges(): void {
    console.log('HomeComponent: ngOnChanges called — welcomeMessage:', this.welcomeMessage);
  }

  // ngOnDestroy: runs before component is destroyed — clean up subscriptions!
  ngOnDestroy(): void {
    console.log('HomeComponent: ngOnDestroy called');
    this.subscription?.unsubscribe();
  }

  // Event binding handler
  onSearchChange(): void {
    this.lastAction = `Searched: "${this.searchQuery}"`;
    this.filterCourses();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.lastAction = `Category: ${category}`;
    this.filterCourses();
  }

  onCardClick(course: Course): void {
    this.clickCount++;
    this.lastAction = `Clicked: ${course.title}`;
    // @Output EventEmitter
    this.courseSelected.emit(course);
  }

  onEnrollToggle(course: Course, event: Event): void {
    event.stopPropagation();
    this.courseService.toggleEnrollment(course.id);
    this.lastAction = course.enrolled ? `Unenrolled from ${course.title}` : `Enrolled in ${course.title}`;
  }

  private filterCourses(): void {
    this.filteredCourses = this.courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            c.instructor.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || c.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  private updateStats(): void {
    this.stats.totalCourses = this.courses.length;
    this.stats.enrolledCourses = this.courses.filter(c => c.enrolled).length;
    this.stats.availableCourses = this.courses.filter(c => !c.enrolled).length;
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}
