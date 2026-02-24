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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login = () => {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.authService.login({ username, password }).subscribe({
        next: (res) => {
          const token = res?.access_token;
          const expireTime = this.getExpireTime(res?.expires_in);
          console.log(expireTime);
          console.log(expireTime);
          if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', res?.refresh_token);
            localStorage.setItem('expires_in', expireTime.toString());
          }
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
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
