import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LayoutGrid,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CircleCheck,
  ShieldCheck,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-reset-password',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  icons = {
    LayoutGrid,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    CircleCheck,
    ShieldCheck,
  };

  resetPasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  showPassword = signal(false);
  isLoading = signal(false);

  router = inject(Router);
  isSubmitted = signal(false);

  onNavigate(route: string) {
    this.router.navigate([route]);
  }
}
