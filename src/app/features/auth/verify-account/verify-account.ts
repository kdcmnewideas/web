import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshCw, Mail, LucideAngularModule, ArrowLeft, CircleCheck } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { AuthService } from '../../../services/auth/auth.service';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-account',
  imports: [LucideAngularModule, FormsModule, InputOtpModule, ButtonModule],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css',
  providers: [MessageService],
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

  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.token.set(queryParams['token']);
    });
  }

  handleResend() {}

  handleVerification() {
    this.isLoading.set(true);
    this.authService
      .verify(this.token()!)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.isVerified.set(true);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isVerified.set(false);
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
