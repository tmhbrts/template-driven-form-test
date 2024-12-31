import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Equipment } from './contracts/team/equipment';
import { Team, TeamSchema, departments } from './contracts/team/team.schema';
import { FormSchemaDirective } from './lib/form-schema.directive';
import { NgModelErrorSubscriberDirective } from './lib/ng-model-error-subscriber.directive';
import { NgModelGroupErrorSubscriberDirective } from './lib/ng-model-group-error-subscriber.directive';
import { PartialDeep } from 'type-fest';

const newEmptyTeamMember = { name: undefined, age: undefined };
const defaultEquipmentOptions: Equipment[] = [
  Equipment.Desk,
  Equipment.Chair,
  Equipment.Computer,
  Equipment.Monitor,
  Equipment.Keyboard,
  Equipment.Mouse,
];

@Component({
  selector: 'app-template-driven-form',
  imports: [
    CommonModule,
    FormSchemaDirective,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgModelErrorSubscriberDirective,
    NgModelGroupErrorSubscriberDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  teamSchema = TeamSchema;
  teamModel = signal<PartialDeep<Team>>({});
  defaultEquipmentOnly = signal(false);
  equipmentOptions = Object.values(Equipment);
  departmentOptions = departments;
  form = viewChild.required(NgForm);

  getKeys(errors: Record<string, any>): string[] {
    return Object.keys(errors);
  }

  objectToArray<T>(obj: Record<string, T>): { key: string; value: T }[] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }

  getValidationErrorMessage(errors: ValidationErrors | null): string {
    if (errors) {
      return errors['error'];
    }

    return '';
  }

  toggleDefaultEquipmentOnly(value: boolean) {
    console.log('Toggle value', value);

    if (value) {
      this.teamModel.update((team) => ({
        ...team,
        requiredEquipment: defaultEquipmentOptions,
      }));
    }

    this.defaultEquipmentOnly.set(value);
  }

  addTeamMember() {
    const uuid = crypto.randomUUID();

    this.teamModel.update((team) => ({
      ...team,
      members: { ...team.members, [uuid]: newEmptyTeamMember },
    }));
  }

  onFormUpdated(update: PartialDeep<Team>) {
    console.log('Form updated', update);
    this.teamModel.set(update);
  }

  submitForm() {
    console.log('Form submitted');
  }
}
