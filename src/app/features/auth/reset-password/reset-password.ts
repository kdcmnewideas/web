import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { PasswordModule } from 'primeng/password';
import { ButtonDirective } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [LucideAngularModule, ReactiveFormsModule, PasswordModule, ButtonDirective],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
  providers: [MessageService],
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
  messageService = inject(MessageService);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  token = signal('');

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.token.set(queryParams['token']);
    });
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.isLoading.set(true);
    const { password } = this.resetPasswordForm.value;
    this.authService
      .resetPassword(this.token(), password!)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.isSubmitted.set(true);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isSubmitted.set(false);
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }
}
