import { Component } from '@angular/core';
import {
  SquareCheckBig,
  Square,
  LayoutGrid,
  CircleCheck,
  Users,
  Globe,
  ChartColumn,
  ChartPie,
  Zap,
  LucideAngularModule,
} from 'lucide-angular';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    LucideAngularModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  icons = {
    SquareCheckBig,
    Square,
    LayoutGrid,
    CircleCheck,
    Users,
    Globe,
    ChartColumn,
    ChartPie,
    Zap,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login = () => {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          // store token if present in response (common keys)
          const token = res?.access_token || res?.token || res?.data?.token || res?.auth?.token;
          if (token) {
            try {
              localStorage.setItem('access_token', token);
            } catch (e) {
              console.warn('Failed to persist token to localStorage', e);
            }
          }
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  };
  navigateTo = (page: string) => {
    this.router.navigate([page]);
  };
}
