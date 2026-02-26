import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ArrowLeft,
  CircleCheck,
  KeyRound,
  LayoutGrid,
  Mail,
  ShieldCheck,
  LucideAngularModule,
} from 'lucide-angular';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  imports: [LucideAngularModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
  providers: [MessageService],
})
export class ForgetPassword {
  icons = {
    LayoutGrid,
    KeyRound,
    ArrowLeft,
    CircleCheck,
    Mail,
    ShieldCheck,
  };
  router = inject(Router);
  isSubmitted = signal<boolean>(false);
  email = '';

  isLoading = signal<boolean>(false);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  onNavigate(screenName: string) {
    this.router.navigate([screenName]);
  }

  openEmailApp() {
    window.open('mailto:', '_blank');
  }

  handleSubmit() {
    this.isLoading.set(true);
    this.authService
      .forgotPassword(this.email)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.isSubmitted.set(true);
        },
        error: (err) => {
          this.isSubmitted.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }
}
