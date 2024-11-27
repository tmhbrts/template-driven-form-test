import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadComponent: () =>
      import('./reactive-form/reactive-form.component').then(
        (m) => m.ReactiveFormComponent
      ),
  },
  {
    path: 'template-driven',
    loadComponent: () =>
      import('./template-driven-form/template-driven-form.component').then(
        (m) => m.TemplateDrivenFormComponent
      ),
  },
];
