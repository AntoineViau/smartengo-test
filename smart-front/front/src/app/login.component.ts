import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <form
      #loginForm="ngForm"
      class="border border-primary p-4"
      (ngSubmit)="onSubmit()"
    >
      <mat-form-field class="d-block mb-3">
        <mat-label i18n="Input label@@login_email_label">E-mail</mat-label>
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
        <mat-label i18n="Input label@@login_password_label">Password</mat-label>
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
          i18n-title="Tooltip on show password icon@@show_password_tooltip"
          >remove_red_eye</mat-icon
        >
      </mat-form-field>

      <div class="text-right text-right mt-0 mb-4">
        <a
          class="password-forgot text-black-50"
          href="https://selfsupport.adacap.com:4344/accounts/Reset"
          target="_blank"
          i18n="@@forgot_password"
        >
          <u>Forgotten password?</u>
        </a>
      </div>

      <button
        *ngIf="!processing"
        type="submit"
        class="d-block mx-auto text-white"
        mat-button
        mat-raised-button
        color="primary"
        [disabled]="!loginForm.form.valid"
        i18n="Login button@@login_button"
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
export class LoginComponent {
  email = 'ChuckNorris';
  password = '';
  isPasswordVisible = false;
  @Input() processing = false;
  @Output() submitCredentials = new EventEmitter<Credentials>();
  constructor() {}

  onSubmit() {
    this.submitCredentials.emit({
      email: this.email,
      password: this.password,
    });
  }
}
