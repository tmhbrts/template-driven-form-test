# TemplateDrivenFormTest

Angular 19 project based on [GregOnNet's talk-angular-template-driven-forms](https://github.com/GregOnNet/talk-angular-template-driven-forms). Aim of this project is to compare Reactive forms to an alternative template driven approach.

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## How to implement validation in template driven forms

### Using the Form Schema Directive

To include validation in template-driven forms, you need to use the `formSchema` directive. This directive allows you to bind your form to a predefined Valibot schema, ensuring that all the necessary validations are applied.

```html
<form class="form" [formSchema]="teamSchema" (formUpdated)="onFormUpdated($event)" #formSchema="formSchema">
  <!-- form fields here -->
</form>
```

### Using ngModel and ngModelGroup

For each form control, use the `ngModel` directive to bind the control to a property in your model. For groups of controls, use the `ngModelGroup` directive.

```html
<mat-form-field>
  <mat-label>Team Name</mat-label>
  <input required matInput [ngModel]="teamModel().teamName" #teamNameRef="ngModel" name="teamName" />
  <mat-error>{{ getValidationErrorMessage(teamNameRef.errors) }}</mat-error>
</mat-form-field>
```

```html
<mat-form-field ngModelGroup="contractPeriod" #contractPeriodGroupRef="ngModelGroup">
  <mat-label>Contract Period</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input required [ngModel]="teamModel().contractPeriod?.start" #contractPeriodStartRef="ngModel" name="start" placeholder="Start date" matStartDate />
    <input required [ngModel]="teamModel().contractPeriod?.end" #contractPeriodEndRef="ngModel" name="end" placeholder="End date" matEndDate />
  </mat-date-range-input>
  <mat-date-range-picker #picker></mat-date-range-picker>
  <mat-error> @if (contractPeriodStartRef.errors; as errors) { {{ getValidationErrorMessage(errors) }} } @if (contractPeriodStartRef.errors && contractPeriodEndRef.errors) { {{ " + " }} } @if (contractPeriodEndRef.errors; as errors) { {{ getValidationErrorMessage(errors) }} } @if (contractPeriodGroupRef.errors; as errors) { @for (errorKey of getKeys(errors); track errorKey) { {{ errors[errorKey] }} } } </mat-error>
</mat-form-field>
```

### Using References to ngModel/ngModelGroup

To display validation errors, you need to reference the `ngModel` or `ngModelGroup` directive. This reference allows you to access the errors and display appropriate messages.

```html
<mat-form-field>
  <mat-label>Department</mat-label>
  <mat-select required [ngModel]="teamModel().department" #departmentRef="ngModel" name="department">
    <!-- options here -->
  </mat-select>
  <mat-error>{{ getValidationErrorMessage(departmentRef.errors) }}</mat-error>
</mat-form-field>
```

### Using getValidationErrorMessage Function

The `getValidationErrorMessage` function is used to display the appropriate error message based on the validation errors.

```html
<mat-error>{{ getValidationErrorMessage(teamNameRef.errors) }}</mat-error>
```

### Using Angular Material mat-form-field and mat-error

Angular Material's `mat-form-field` and `mat-error` components are used to create form fields and display validation errors in a user-friendly manner.

```html
<mat-form-field>
  <mat-label>Contract Period</mat-label>
  <mat-date-range-input [rangePicker]="picker" ngModelGroup="contractPeriod" #contractPeriodGroupRef="ngModelGroup">
    <!-- date inputs here -->
  </mat-date-range-input>
  <mat-date-range-picker #picker></mat-date-range-picker>
  <mat-error>
    <!-- error messages here -->
  </mat-error>
</mat-form-field>
```

### Custom Check on Control Dirty State and formSchema.formIsSubmitted

To show mat-error elements outside a mat-form-field only when the control is dirty or the form has been submitted, use a custom check.

```html
@if ( (requiredEquipmentRef.control.dirty || formSchema.formIsSubmitted()) && requiredEquipmentRef.errors ) {
<mat-error> {{ getValidationErrorMessage(requiredEquipmentRef.errors) }} </mat-error>
}
```

### Using objectToArray for Record Objects

When dealing with `Record` objects, use the `objectToArray` function to convert them into arrays. This is necessary because form arrays from the form schema can cause issues with model binding.

```html
@for ( member of objectToArray(teamModel().members || {}); track member.key ) {
<div class="form__member-entry" [ngModelGroup]="member.key">
  <!-- member fields here -->
</div>
}
```
