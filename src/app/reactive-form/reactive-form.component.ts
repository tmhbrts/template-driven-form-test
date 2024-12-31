import { CommonModule } from '@angular/common';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { map, shareReplay, startWith, Subject, tap } from 'rxjs';
import { switchMap, timer } from 'rxjs';

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
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  private fb = inject(FormBuilder);
  private defaultEquipementOptions: Equipment[] = [
    Equipment.Desk,
    Equipment.Chair,
    Equipment.Computer,
    Equipment.Monitor,
    Equipment.Keyboard,
    Equipment.Mouse,
  ];

  constructor() {
    this.defaultEquipmentOnlyControl.valueChanges
      .pipe(
        startWith(false),
        tap((value) => {
          if (value) {
            this.requiredEquipmentControl.setValue(
              this.defaultEquipementOptions,
            );
            this.requiredEquipmentControl.disable();
            return;
          }

          this.requiredEquipmentControl.enable();
        }),
      )
      .subscribe();
  }

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
    defaultEquipmentOnly: this.fb.control<boolean>(false),
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

  teamNameControl = this.teamForm.controls.teamName;
  departmentControl = this.teamForm.controls.department;
  contractPeriodStartControl = this.teamForm.controls.contractPeriodStart;
  contractPeriodEndControl = this.teamForm.controls.contractPeriodEnd;
  defaultEquipmentOnlyControl = this.teamForm.controls.defaultEquipmentOnly;
  requiredEquipmentControl = this.teamForm.controls.requiredEquipment;
  membersControl = this.teamForm.controls.members;

  teamMemberSyncRequest$ = new Subject<void>();

  //simulates a 3s response time
  teamMemberSyncStatus$ = this.teamMemberSyncRequest$.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(map((tick) => (tick < 3 ? true : false))),
    ),
    shareReplay(1),
  );

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
}
