import { Component, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Team, TeamSchema, departments } from './contracts/team/team.schema';
import { Equipment } from './contracts/team/equipment';
import { FormSchemaDirective } from './lib/form-schema.directive';
import { PartialDeep } from 'type-fest';
import { NgModelGroupErrorSubscriberDirective } from './lib/ng-model-group-error-subscriber.directive';
import { NgModelErrorSubscriberDirective } from './lib/ng-model-error-subscriber.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { FormFieldOutletComponent } from './lib/form-field-outlet.component';

@Component({
  selector: 'app-template-driven-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    FormSchemaDirective,
    FormFieldOutletComponent,
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
  equipmentOptions = Object.values(Equipment);
  departmentOptions = departments;
  form = viewChild.required(NgForm);

  addTeamMember() {
    console.log('Adding team member');
  }

  onFormUpdated(update: PartialDeep<Team>) {
    console.log('Form updated', update);
  }

  submitForm() {
    console.log('Form submitted');
  }
}
