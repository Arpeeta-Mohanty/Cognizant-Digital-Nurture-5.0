import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

// Root component — shell that holds the header and router outlet
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <!-- RouterOutlet renders the active route's component -->
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <p>© {{ year }} Student Course Portal — Cognizant Digital Nurture 5.0 Week 8</p>
    </footer>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 120px);
      padding: 0;
    }
    .footer {
      background: #2d3748;
      color: #a0aec0;
      text-align: center;
      padding: 1rem;
      font-size: 0.85rem;
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
}
