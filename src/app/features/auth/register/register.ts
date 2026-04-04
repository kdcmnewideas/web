import { AuthService } from './../../../services/auth/auth.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Rocket,
  Star,
  Trophy,
  ChartNoAxesColumn,
  ChartPie,
  Target,
  Users,
  Globe,
  LucideAngularModule,
  Award,
  CircleCheckBig,
} from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    LucideAngularModule,
    ToastModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [MessageService],
})
export class Register implements OnInit {
  activeSlide = signal(0);

  // Slides Data
  slides = [
    {
      id: 0,
      title: 'Start your learning journey',
      description:
        'Join over 10,000 students achieving their goals with our interactive lessons and real-time analytics.',
      icons: {
        top: { icon: Star, color: 'text-yellow-300', bg: 'bg-white/10' },
        main: { icon: Rocket, color: 'text-white', bg: 'bg-white/20' },
        bottom: { icon: Trophy, color: 'text-orange-300', bg: 'bg-white/10' },
      },
    },
    {
      id: 1,
      title: 'Track your progress',
      description:
        'Visualize your improvements with detailed charts and gain insights into your weak spots.',
      icons: {
        top: { icon: ChartPie, color: 'text-emerald-300', bg: 'bg-emerald-500/20' },
        main: { icon: ChartNoAxesColumn, color: 'text-white', bg: 'bg-emerald-500/30' },
        bottom: { icon: Target, color: 'text-red-300', bg: 'bg-red-500/20' },
      },
    },
    {
      id: 2,
      title: 'Connect & Compete',
      description:
        'Challenge friends, join study groups, and climb the global leaderboards to prove your mastery.',
      icons: {
        top: { icon: Globe, color: 'text-blue-300', bg: 'bg-blue-500/20' },
        main: { icon: Users, color: 'text-white', bg: 'bg-blue-500/30' },
        bottom: { icon: Award, color: 'text-purple-300', bg: 'bg-purple-500/20' },
      },
    },
  ];

  loading = signal(false);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    join_key: new FormControl('', [Validators.required]),
  });

  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  screen = signal(0);
  icons = {
    CircleCheckBig,
  };

  // Auto-rotate slides
  ngOnInit(): void {
    setInterval(() => {
      this.activeSlide.set((this.activeSlide() + 1) % this.slides.length);
    }, 4000);
  }

  currentSlide = computed(() => {
    return this.slides[this.activeSlide()];
  });

  setActiveSlide = (index: number) => {
    this.activeSlide.set(index);
  };

  navigateTo = (page: string) => {
    this.router.navigate([page]);
  };

  registerUser = () => {
    const { name, email, password, join_key } = this.registerForm.value;
    this.loading.set(true);
    if (name && email && password && join_key)
      this.authService.register({ name, email, password, join_key }).subscribe({
        next: () => {
          this.screen.set(1);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to register',
          });
        },
      });
  };
}
