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

@Component({
  selector: 'app-forget-password',
  imports: [LucideAngularModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
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

  onNavigate(screenName: string) {
    this.router.navigate([screenName]);
  }

  openEmailApp() {
    window.open('mailto:', '_blank');
  }
}
