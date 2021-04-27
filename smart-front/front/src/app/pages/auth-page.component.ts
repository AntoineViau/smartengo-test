import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  template: `
    <div class="w-25 mx-auto mt-5">
      <mat-tab-group>
        <mat-tab label="Login">
          <app-login-form></app-login-form>
        </mat-tab>
        <mat-tab label="Register">
          <app-register-form></app-register-form>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class AuthPageComponent {}
