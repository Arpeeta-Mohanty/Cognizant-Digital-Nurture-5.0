import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService, Notification } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  loadingService = inject(LoadingService);

  notification$ = this.notificationService.notification$;
  loading$ = this.loadingService.loading$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  login(): void {
    this.authService.login('student', 'password');
    this.notificationService.success('Logged in successfully!');
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.info('Logged out.');
  }

  getNotificationClass(notification: Notification): string {
    const map: Record<string, string> = {
      success: 'alert-success',
      error: 'alert-error',
      info: 'alert-info',
      warning: 'alert-warning'
    };
    return map[notification.type] || 'alert-info';
  }
}
