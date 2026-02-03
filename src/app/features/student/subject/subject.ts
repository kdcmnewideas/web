import { ScreenName } from './../../../shared/constants/screen-names.constant';
import { Component, computed, inject, signal } from '@angular/core';
import {
  ArrowLeft,
  Play,
  BookOpen,
  PenTool,
  Lock,
  RefreshCw,
  ChevronRight,
  Trophy,
  Clock,
  Sparkles,
  Zap,
  Star,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Award,
  Activity,
  Box,
  CircleCheck,
  CirclePlay,
  EllipsisVertical,
  LucideAngularModule,
  Compass,
} from 'lucide-angular';
import { SUBJECTS, ALL_LESSONS } from '../../../shared/constants/mock-data.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { LessonCard } from "./lesson-card/lesson-card";

@Component({
  selector: 'app-subject',
  imports: [LucideAngularModule, CardModule, LessonCard],
  templateUrl: './subject.html',
  styleUrl: './subject.css',
})
export class Subject {
  icons = {
    ArrowLeft,
    Play,
    BookOpen,
    PenTool,
    CircleCheck,
    Lock,
    RefreshCw,
    CirclePlay,
    ChevronRight,
    Trophy,
    Clock,
    Sparkles,
    Zap,
    EllipsisVertical,
    Star,
    Layers,
    ArrowUpRight,
    TrendingUp,
    Award,
    Activity,
    Box,
    Compass
  };

  subject = computed(() => SUBJECTS.find((s) => s.id === this.subjectId()) || SUBJECTS[0]);
  lessons = computed(() => ALL_LESSONS.filter((l) => l.subjectId === this.subject().id));

  subjectId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  ScreenName = ScreenName;
  constructor() {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.subjectId.set(params['id']);
    });
  }

  // High-Fidelity Professional Theme Engine
  getThemeStyles = (colorClass: string) => {
    if (colorClass.includes('indigo'))
      return {
        main: 'text-indigo-600',
        bg: 'bg-indigo-50/50',
        border: 'border-indigo-100',
        glow: 'shadow-indigo-500/10',
        gradient: 'from-indigo-600 to-indigo-900',
        accent: 'bg-indigo-600',
      };
    if (colorClass.includes('teal'))
      return {
        main: 'text-teal-600',
        bg: 'bg-teal-50/50',
        border: 'border-teal-100',
        glow: 'shadow-teal-500/10',
        gradient: 'from-teal-600 to-emerald-800',
        accent: 'bg-teal-600',
      };
    if (colorClass.includes('rose'))
      return {
        main: 'text-rose-600',
        bg: 'bg-rose-50/50',
        border: 'border-rose-100',
        glow: 'shadow-rose-500/10',
        gradient: 'from-rose-600 to-pink-800',
        accent: 'bg-rose-600',
      };
    if (colorClass.includes('amber'))
      return {
        main: 'text-amber-600',
        bg: 'bg-amber-50/50',
        border: 'border-amber-100',
        glow: 'shadow-amber-500/10',
        gradient: 'from-amber-600 to-orange-800',
        accent: 'bg-amber-600',
      };
    if (colorClass.includes('emerald'))
      return {
        main: 'text-emerald-600',
        bg: 'bg-emerald-50/50',
        border: 'border-emerald-100',
        glow: 'shadow-emerald-500/10',
        gradient: 'from-emerald-600 to-teal-800',
        accent: 'bg-emerald-600',
      };
    return {
      main: 'text-slate-600',
      bg: 'bg-slate-50/50',
      border: 'border-slate-100',
      glow: 'shadow-slate-500/10',
      gradient: 'from-slate-600 to-slate-900',
      accent: 'bg-slate-600',
    };
  };

  theme = computed(() => this.getThemeStyles(this.subject().color));

  stats = [
          { label: 'Mastery', val: `${this.subject().progress}%`, icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Rank', val: '#4', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Velocity', val: '1.2x', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Knowledge', val: '142', icon: Box, color: 'text-purple-600', bg: 'bg-purple-50' }
          ]

  onNavigate(path: string, data?: any) {
    this.router.navigate([path]);
  }
}
