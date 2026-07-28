import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import * as CourseActions from './course.actions';

// Effects handle side effects (HTTP calls) triggered by actions
@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);
  private notificationService = inject(NotificationService);

  // When loadCourses is dispatched, call the API and dispatch success/failure
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),
      switchMap(({ course }) =>
        this.courseService.createCourse(course).pipe(
          map(newCourse => {
            this.notificationService.success('Course added successfully!');
            return CourseActions.addCourseSuccess({ course: newCourse });
          }),
          catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      switchMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => {
            this.notificationService.success('Course deleted.');
            return CourseActions.deleteCourseSuccess({ id });
          }),
          catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
