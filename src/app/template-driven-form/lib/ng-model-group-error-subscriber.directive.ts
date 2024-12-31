import {
  AfterViewInit,
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgModelGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { FormSchemaDirective } from './form-schema.directive';

@Component({
  standalone: true,
  template: `
    @if (isVisible()) {
      <span class="text-red-500 mb-4 ">
        {{ text() }}
      </span>
    }
  `,
})
export class ErrorSummaryComponent {
  isVisible = signal(false);
  text = model.required<string>();
}

@Directive({
  selector: '[ngModelGroup]',
  standalone: true,
})
export class NgModelGroupErrorSubscriberDirective implements AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #ngControl = inject(NgModelGroup);

  #formSchema = inject(FormSchemaDirective);

  #componentRef: ComponentRef<ErrorSummaryComponent> | undefined;

  name = input('', { alias: 'ngModelGroup' });

  ngAfterViewInit(): void {
    this.#bindFormSettingErrors()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  #bindFormSettingErrors() {
    return this.#formSchema.errors$.pipe(
      tap((errors) => {
        const error = errors?.[this.name()] ?? null;

        if (error) {
          this.#ngControl.control?.setErrors(error);
        }
      }),
    );
  }
}
