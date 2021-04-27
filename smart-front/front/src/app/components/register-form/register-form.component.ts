import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-form',
  template: `
    <form #registerForm="ngForm" class=" p-4" (ngSubmit)="onSubmit()">
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
          type="password"
          [(ngModel)]="password1"
          name="password1"
          required
          #password1Input="ngModel"
        />
      </mat-form-field>

      <mat-form-field class="d-block">
        <mat-label>Repeat Password</mat-label>
        <input
          [disabled]="processing"
          matInput
          type="password"
          [(ngModel)]="password2"
          name="password2"
          required
          #password2Input="ngModel"
        />

        <mat-error
          *ngIf="
            (password2Input.dirty || password2Input.touched) &&
            password1 !== '' &&
            password2 !== '' &&
            password1 !== password2
          "
        >
          Password confirmation does not match
        </mat-error>
      </mat-form-field>

      <button
        *ngIf="!processing"
        type="submit"
        class="d-block mx-auto text-white"
        mat-button
        mat-raised-button
        color="primary"
        [disabled]="!registerForm.form.valid || password1 !== password2"
      >
        Register
      </button>

      <mat-spinner
        class="mx-auto"
        diameter="30"
        *ngIf="processing"
      ></mat-spinner>
    </form>
  `,
})
export class RegisterFormComponent {
  email = 'toto@titi.com';
  password1 = 'antoine';
  password2 = 'antoine';
  processing = false;

  constructor(private httpClient: HttpClient) {}

  async onSubmit() {
    const url = `${environment.api.auth}/user`;
    this.processing = true;
    await this.httpClient
      .post(url, { login: this.email, password: this.password1 })
      .toPromise();
    this.processing = false;

    // this.submitCredentials.emit({
    //   email: this.email,
    //   password: this.password,
    // });
  }
}
