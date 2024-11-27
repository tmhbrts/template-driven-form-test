import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tabLinks = [
    { path: 'reactive', label: 'Reactive Form' },
    { path: 'template-driven', label: 'Template Driven Form' },
  ];

  constructor(private router: Router) {}

  getCurrentSubroute(): string {
    return this.router.url.split('/')[1] || '';
  }
}
