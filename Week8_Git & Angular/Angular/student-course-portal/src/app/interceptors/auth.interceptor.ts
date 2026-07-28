import { HttpInterceptorFn } from '@angular/common/http';

// Functional interceptor (Angular 15+)
// Automatically attaches the auth token to every outgoing HTTP request
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};
