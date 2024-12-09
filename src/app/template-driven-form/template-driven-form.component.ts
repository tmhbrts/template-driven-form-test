import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

enum Equipment {
  Desk = 'Desk',
  Chair = 'Chair',
  Computer = 'Computer',
  Monitor = 'Monitor',
  Keyboard = 'Keyboard',
  Mouse = 'Mouse',
  Printer = 'Printer',
  Phone = 'Phone',
}

const departments = ['Development', 'Marketing', 'Sales', 'Support'];

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  departments = departments;
  equipmentOptions = Object.values(Equipment);

  addTeamMember() {
    console.log('Adding team member');
  }

  submitForm() {
    console.log('Submitting form');
  }
}
