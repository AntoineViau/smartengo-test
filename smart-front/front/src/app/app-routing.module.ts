import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthPageComponent } from './pages/auth-page.component';

const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    // canActivateChild: [SmartActivateGuard],
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: AuthPageComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'login', component: LoginFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
