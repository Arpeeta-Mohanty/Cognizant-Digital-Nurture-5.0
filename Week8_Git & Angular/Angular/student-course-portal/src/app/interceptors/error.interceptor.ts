import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

// Catches all HTTP errors and shows a user-friendly notification
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';

      if (error.status === 0) {
        message = 'Cannot connect to server. Is JSON Server running?';
      } else if (error.status === 400) {
        message = 'Bad request. Please check your input.';
      } else if (error.status === 401) {
        message = 'Unauthorized. Please log in.';
      } else if (error.status === 403) {
        message = 'Forbidden. You do not have permission.';
      } else if (error.status === 404) {
        message = 'Resource not found.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      }

      notificationService.error(message);
      return throwError(() => error);
    })
  );
};
