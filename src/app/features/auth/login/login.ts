import { Component, inject, signal } from '@angular/core';
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
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    LucideAngularModule,
    ToastModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService],
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
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

  error = signal('');
  loading = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  login = () => {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.loading.set(true);
      this.authService.login({ username, password }).subscribe({
        next: (res) => {
          const token = res?.access_token;
          const expireTime = this.getExpireTime(res?.expires_in);
          if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', res?.refresh_token);
            localStorage.setItem('expires_in', expireTime.toString());
          }
          this.loading.set(false);
          this.error.set('');
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.error.set('Invalid credentials');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to login',
            });
          }
          this.loading.set(false);
        },
      });
    }
  };

  getExpireTime = (expires_in: number) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expires_in - 5);
    return date;
  };

  navigateTo = (page: string) => {
    this.router.navigate([page]);
  };
}
