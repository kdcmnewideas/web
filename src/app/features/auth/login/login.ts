import { Component, Inject, signal } from '@angular/core';
import {
  lucideSquareCheckBig,
  lucideSquare,
  lucideLayoutGrid,
  lucideCircleCheck,
  lucideUsers,
  lucideGlobe,
  lucideChartColumn,
  lucideChartPie,
  lucideZap,
} from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    NgIcon,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  viewProviders: [
    provideIcons({
      lucideSquareCheckBig,
      lucideSquare,
      lucideLayoutGrid,
      lucideCircleCheck,
      lucideUsers,
      lucideGlobe,
      lucideChartColumn,
      lucideChartPie,
      lucideZap,
    }),
  ],
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    const { email, password } = this.loginForm.value;
    if (email && password)
      this.authService.login({ email, password }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }
}
