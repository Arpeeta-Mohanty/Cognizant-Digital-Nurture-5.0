import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Enrollment } from '../models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/enrollments';

  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  enrollments$ = this.enrollmentsSubject.asObservable();

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl).pipe(
      tap(data => this.enrollmentsSubject.next(data)),
      catchError(() => of([]))
    );
  }

  enroll(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    const newEnrollment = { ...enrollment, id: Date.now() };
    return this.http.post<Enrollment>(this.apiUrl, newEnrollment).pipe(
      tap(e => this.enrollmentsSubject.next([...this.enrollmentsSubject.value, e])),
      catchError(() => {
        // Fallback: add locally if server is offline
        const local = { ...newEnrollment } as Enrollment;
        this.enrollmentsSubject.next([...this.enrollmentsSubject.value, local]);
        return of(local);
      })
    );
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updated = this.enrollmentsSubject.value.filter(e => e.id !== id);
        this.enrollmentsSubject.next(updated);
      }),
      catchError(() => of(undefined as void))
    );
  }

  getLocalEnrollments(): Enrollment[] {
    return this.enrollmentsSubject.value;
  }
}
