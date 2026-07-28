import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="content">
        <div class="code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a routerLink="/" class="btn btn-primary">← Go Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
    }
    .code {
      font-size: 6rem;
      font-weight: 900;
      color: #4299e1;
      line-height: 1;
    }
    h1 { font-size: 1.8rem; margin: 0.5rem 0; }
    p { color: #718096; margin-bottom: 1.5rem; }
  `]
})
export class NotFoundComponent {}
