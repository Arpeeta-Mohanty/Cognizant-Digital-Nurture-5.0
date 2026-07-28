import { createAction, props } from '@ngrx/store';
import { Enrollment } from '../../models/enrollment.model';

export const loadEnrollments = createAction('[Enrollment] Load Enrollments');
export const loadEnrollmentsSuccess = createAction('[Enrollment] Load Enrollments Success', props<{ enrollments: Enrollment[] }>());
export const loadEnrollmentsFailure = createAction('[Enrollment] Load Enrollments Failure', props<{ error: string }>());

export const addEnrollment = createAction('[Enrollment] Add Enrollment', props<{ enrollment: Omit<Enrollment, 'id'> }>());
export const addEnrollmentSuccess = createAction('[Enrollment] Add Enrollment Success', props<{ enrollment: Enrollment }>());

export const removeEnrollment = createAction('[Enrollment] Remove Enrollment', props<{ id: number }>());
export const removeEnrollmentSuccess = createAction('[Enrollment] Remove Enrollment Success', props<{ id: number }>());
