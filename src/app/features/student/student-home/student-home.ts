import { GoalService } from './../../../services/goal/goal.service';
import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFlame, lucideTarget } from '@ng-icons/lucide';
import { Goal } from './components/goal/goal';
import { IGoal } from '../../../core/interface/goal.interface';
import { GOALS } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-student-home',
  imports: [NgIcon, Goal],
  templateUrl: './student-home.html',
  styleUrl: './student-home.css',
  viewProviders: [provideIcons({ lucideFlame, lucideTarget })],
})
export class StudentHome implements OnInit {
  user: any;
  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  goals: IGoal[] = GOALS;

  GoalService = inject(GoalService);

  ngOnInit(): void {
    this.getGoals();
  }

  getGoals = () => {
    this.GoalService.getGoal(this.user?.id).subscribe({
      next: (res) => (this.goals = res),
      error: (err) => console.log('Get Goal service failed', err),
    });
  };
}
