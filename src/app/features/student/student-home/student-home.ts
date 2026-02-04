import { SUBJECTS, CURRENT_USER } from './../../../shared/constants/mock-data.constant';
import { GoalService } from './../../../services/goal/goal.service';
import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFlame,
  lucideTarget,
  lucidePlayCircle,
  lucideLayoutDashboard,
} from '@ng-icons/lucide';
import { Goal } from './components/goal/goal';
import { IGoal } from '../../../core/interface/goal.interface';
import { GOALS, RECENT_LESSONS } from '../../../shared/constants/mock-data.constant';
import { bootstrapFire } from '@ng-icons/bootstrap-icons';
import { JumpbackCard } from './components/jumpback-card/jumpback-card';
import { SubjectCard } from "./components/subject-card/subject-card";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  imports: [NgIcon, Goal, JumpbackCard, SubjectCard],
  templateUrl: './student-home.html',
  styleUrl: './student-home.css',
  viewProviders: [
    provideIcons({
      lucideFlame,
      lucideTarget,
      bootstrapFire,
      lucidePlayCircle,
      lucideLayoutDashboard,
    }),
  ],
})
export class StudentHome implements OnInit {
  user: any = CURRENT_USER;
  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  goals: IGoal[] = GOALS;
  RECENT_LESSONS = RECENT_LESSONS;
  SUBJECTS = SUBJECTS;
  router = inject(Router);

  GoalService = inject(GoalService);
  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';

  ngOnInit(): void {
    this.getGoals();
  }

  getGoals = () => {
    this.GoalService.getGoal(this.user?.id).subscribe({
      next: (res) => (this.goals = res),
      error: (err) => console.log('Get Goal service failed', err),
    });
  };

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
