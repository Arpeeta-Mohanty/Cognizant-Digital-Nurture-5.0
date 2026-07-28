import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

// providedIn: 'root' makes this a singleton — one instance for the whole app
@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/courses';

  // BehaviorSubject holds the current list and emits to all subscribers
  private coursesSubject = new BehaviorSubject<Course[]>(this.getSeedData());
  courses$ = this.coursesSubject.asObservable();

  // Seed data used when JSON server is not running
  private getSeedData(): Course[] {
    return [
      { id: 1, title: 'Angular Fundamentals', instructor: 'John Smith', credits: 4, category: 'Frontend', description: 'Learn Angular from scratch with components, directives, and services.', enrolled: false, rating: 4.8, duration: '40 hours' },
      { id: 2, title: 'Spring Boot Basics', instructor: 'Jane Doe', credits: 3, category: 'Backend', description: 'Build REST APIs with Spring Boot and JPA.', enrolled: true, rating: 4.6, duration: '35 hours' },
      { id: 3, title: 'Data Structures', instructor: 'Bob Wilson', credits: 4, category: 'Core CS', description: 'Arrays, linked lists, trees, graphs, and algorithms.', enrolled: false, rating: 4.9, duration: '50 hours' },
      { id: 4, title: 'Database Management', instructor: 'Alice Brown', credits: 3, category: 'Database', description: 'SQL, normalization, transactions, and query optimization.', enrolled: true, rating: 4.5, duration: '30 hours' },
      { id: 5, title: 'Cloud Computing', instructor: 'Charlie Davis', credits: 3, category: 'Cloud', description: 'AWS, Azure, and GCP fundamentals with hands-on labs.', enrolled: false, rating: 4.7, duration: '45 hours' },
      { id: 6, title: 'Machine Learning', instructor: 'Diana Prince', credits: 4, category: 'AI/ML', description: 'Supervised and unsupervised learning with Python and scikit-learn.', enrolled: false, rating: 4.8, duration: '60 hours' },
    ];
  }

  // GET all courses from JSON server
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      tap(courses => this.coursesSubject.next(courses)),
      catchError(() => {
        // Fallback to seed data if server is offline
        return of(this.getSeedData());
      })
    );
  }

  // GET single course by ID
  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(this.getSeedData().find(c => c.id === id)))
    );
  }

  // POST — create new course
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next([...current, newCourse]);
      })
    );
  }

  // PUT — update existing course
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updated => {
        const current = this.coursesSubject.value.map(c => c.id === id ? updated : c);
        this.coursesSubject.next(current);
      })
    );
  }

  // DELETE — remove course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.coursesSubject.value.filter(c => c.id !== id);
        this.coursesSubject.next(current);
      })
    );
  }

  // Toggle enrollment locally
  toggleEnrollment(id: number): void {
    const courses = this.coursesSubject.value.map(c =>
      c.id === id ? { ...c, enrolled: !c.enrolled } : c
    );
    this.coursesSubject.next(courses);
  }

  getLocalCourses(): Course[] {
    return this.coursesSubject.value;
  }
}
