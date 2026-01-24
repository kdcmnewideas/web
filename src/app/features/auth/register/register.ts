import { AuthService } from './../../../services/auth/auth.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayoutGrid,
  lucideRocket,
  lucideStar,
  lucideBookOpen,
  lucideTrophy,
  lucideBarChart2,
  lucidePieChart,
  lucideTarget,
  lucideUsers,
  lucideGlobe,
  lucideAward,
} from '@ng-icons/lucide';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  imports: [NgIcon, InputTextModule, ReactiveFormsModule, PasswordModule, ButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  viewProviders: [
    provideIcons({
      lucideLayoutGrid,
      lucideRocket,
      lucideStar,
      lucideBookOpen,
      lucideTrophy,
      lucideBarChart2,
      lucidePieChart,
      lucideTarget,
      lucideUsers,
      lucideGlobe,
      lucideAward,
    }),
  ],
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
        top: { icon: 'lucideStar', color: 'text-yellow-300', bg: 'bg-white/10' },
        main: { icon: 'lucideRocket', color: 'text-white', bg: 'bg-white/20' },
        bottom: { icon: 'lucideTrophy', color: 'text-orange-300', bg: 'bg-white/10' },
      },
    },
    {
      id: 1,
      title: 'Track your progress',
      description:
        'Visualize your improvements with detailed charts and gain insights into your weak spots.',
      icons: {
        top: { icon: 'lucidePieChart', color: 'text-emerald-300', bg: 'bg-emerald-500/20' },
        main: { icon: 'lucideBarChart2', color: 'text-white', bg: 'bg-emerald-500/30' },
        bottom: { icon: 'lucideTarget', color: 'text-red-300', bg: 'bg-red-500/20' },
      },
    },
    {
      id: 2,
      title: 'Connect & Compete',
      description:
        'Challenge friends, join study groups, and climb the global leaderboards to prove your mastery.',
      icons: {
        top: { icon: 'lucideGlobe', color: 'text-blue-300', bg: 'bg-blue-500/20' },
        main: { icon: 'lucideUsers', color: 'text-white', bg: 'bg-blue-500/30' },
        bottom: { icon: 'lucideAward', color: 'text-purple-300', bg: 'bg-purple-500/20' },
      },
    },
  ];

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    join_key: new FormControl('', [Validators.required]),
  });

  router = inject(Router);
  authService = inject(AuthService);

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
    if (name && email && password && join_key)
      this.authService.register({ name, email, password, join_key }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  };
}
