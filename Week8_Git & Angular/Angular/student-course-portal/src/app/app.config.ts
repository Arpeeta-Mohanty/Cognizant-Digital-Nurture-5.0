import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone-based change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router with component input binding (route params as @Input)
    provideRouter(routes, withComponentInputBinding()),

    // HttpClient with functional interceptors (auth, error, loading)
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
    ),

    // NgRx Store with course and enrollment feature slices
    provideStore({
      courses: courseReducer,
      enrollments: enrollmentReducer
    }),

    // NgRx Effects
    provideEffects([CourseEffects]),

    // Redux DevTools (only in development mode)
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};
