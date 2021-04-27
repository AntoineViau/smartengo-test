import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  template: `
    <form #loginForm="ngForm" class="p-4" (ngSubmit)="onSubmit()">
      <mat-form-field class="d-block mb-3">
        <mat-label>E-mail</mat-label>
        <input
          [disabled]="processing"
          matInput
          type="email"
          email
          autocomplete="off"
          [(ngModel)]="email"
          name="email"
          required
          #emailInput="ngModel"
        />
        <mat-error
          *ngIf="
            (emailInput.dirty || emailInput.touched) &&
            email !== '' &&
            emailInput.invalid
          "
        >
          Invalid e-mail
        </mat-error>
      </mat-form-field>

      <mat-form-field class="d-block">
        <mat-label>Password</mat-label>
        <input
          [disabled]="processing"
          matInput
          [attr.type]="isPasswordVisible ? 'text' : 'password'"
          [(ngModel)]="password"
          name="password"
          required
        />
        <mat-icon
          role="button"
          matSuffix
          (mousedown)="isPasswordVisible = true"
          (mouseup)="isPasswordVisible = false"
          [hidden]="!!!password || processing"
          title="Show password"
          >remove_red_eye</mat-icon
        >
      </mat-form-field>

      <button
        *ngIf="!processing"
        type="submit"
        class="d-block mx-auto text-white"
        mat-button
        mat-raised-button
        color="primary"
        [disabled]="!loginForm.form.valid"
      >
        Login
      </button>

      <mat-spinner
        class="mx-auto"
        diameter="30"
        *ngIf="processing"
      ></mat-spinner>
    </form>
  `,
})
export class LoginFormComponent {
  email = '';
  password = '';
  isPasswordVisible = false;
  @Input() processing = false;
  // @Output() submitCredentials = new EventEmitter<Credentials>();
  constructor() {}

  onSubmit() {
    // this.submitCredentials.emit({
    //   email: this.email,
    //   password: this.password,
    // });
  }
}
