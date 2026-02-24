import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RefreshCw, Mail, LucideAngularModule, ArrowLeft, CircleCheck } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-verify-account',
  imports: [LucideAngularModule, FormsModule, InputOtpModule, ButtonModule],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css',
})
export class VerifyAccount {
  isLoading = signal(false);
  isVerified = signal(false);
  token = signal<string | null>(null);
  email = signal<string | null>(null);
  router = inject(Router);

  icons = {
    RefreshCw,
    Mail,
    ArrowLeft,
    CircleCheck,
  };

  timer = signal(0);

  otp = signal('');
  otpFilled = computed(() =>
    this.otp()
      .split('')
      .some((digit) => !digit),
  );

  handleResend() {}

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
