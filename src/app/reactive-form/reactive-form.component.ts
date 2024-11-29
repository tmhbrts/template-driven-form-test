import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  template: `<form [formGroup]="teamForm">
    <mat-form-field>
      <mat-label>Team Name</mat-label>
      <input matInput placeholder="Team Name" [formControl]="teamNameControl" />
      @if (teamNameControl.hasError('required')) {
        <mat-error> Team Name is required </mat-error>
      }
    </mat-form-field>
  </form> `,
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  private fb = inject(FormBuilder);
  equipmentOptions = Object.values(Equipment);
  departments = departments;

  teamForm = this.fb.group({
    teamName: this.fb.control<string>('', Validators.required),
    department: this.fb.control<(typeof departments)[number] | null>(
      null,
      Validators.required,
    ),
    contractPeriodStart: this.fb.control<Date | null>(null),
    contractPeriodEnd: this.fb.control<Date | null>(null),
    requiredEquipment: this.fb.control<Equipment[]>([]),
    members: this.fb.array([
      this.fb.group({
        name: this.fb.control<string>('', Validators.required),
        age: this.fb.control<number | null>(null, [
          Validators.required,
          Validators.min(0),
        ]),
      }),
    ]),
  });

  addTeamMember() {
    this.membersControl.push(
      this.fb.group({
        name: this.fb.control<string>('', Validators.required),
        age: this.fb.control<number | null>(null, [
          Validators.required,
          Validators.min(0),
        ]),
      }),
    );
  }

  submitForm() {
    if (this.teamForm.valid) {
      console.log(this.teamForm.value);
    }
  }

  teamNameControl = this.teamForm.controls.teamName;
  departmentControl = this.teamForm.controls.department;
  contractPeriodStartControl = this.teamForm.controls.contractPeriodStart;
  contractPeriodEndControl = this.teamForm.controls.contractPeriodEnd;
  requiredEquipmentControl = this.teamForm.controls.requiredEquipment;
  membersControl = this.teamForm.controls.members;
}
