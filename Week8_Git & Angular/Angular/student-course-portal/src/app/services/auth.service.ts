import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  login(username: string, password: string): boolean {
    // Simple demo auth — in production use a real backend
    if (username === 'student' && password === 'password') {
      this.loggedIn.next(true);
      localStorage.setItem('auth_token', 'demo_token_123');
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
