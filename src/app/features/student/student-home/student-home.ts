import { SUBJECTS, CURRENT_USER } from './../../../shared/constants/mock-data.constant';
import { GoalService } from './../../../services/goal/goal.service';
import { Component, inject, OnInit } from '@angular/core';
import { Flame, Target, CirclePlay, LayoutDashboard, LucideAngularModule } from 'lucide-angular';
import { Goal } from './components/goal/goal';
import { IGoal } from '../../../core/interface/goal.interface';
import { GOALS, RECENT_LESSONS } from '../../../shared/constants/mock-data.constant';
import { JumpbackCard } from './components/jumpback-card/jumpback-card';
import { SubjectCard } from './components/subject-card/subject-card';
import { Router } from '@angular/router';
import { SubjectService } from '../../../services/subject/subject.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDashboardService } from '../../../services/user-dashboard/user-dashboard.service';
import { IAssessment } from '../../../core/interface/assessment.interface';

@Component({
  selector: 'app-student-home',
  imports: [LucideAngularModule, Goal, JumpbackCard, SubjectCard],
  templateUrl: './student-home.html',
  styleUrl: './student-home.css',
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

  goalService = inject(GoalService);
  subjectService = inject(SubjectService);
  authService = inject(AuthService);
  dashboardService = inject(UserDashboardService);
  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';

  icons = {
    Flame,
    Target,
    CirclePlay,
    LayoutDashboard,
  };

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;
        this.getGoals();
        this.getRecentAssessments();
      },
      error: (err) => console.log('Get User Details failed', err),
    });
  }

  getRecentAssessments = () => {
    this.dashboardService.getRecentExams(this.user?.id).subscribe({
      next: (res: IAssessment[]) => {
        // Map IAssessment to the expected Lesson structure for "Jump Back In"
        this.RECENT_LESSONS = res.map(assessment => {
          const subject = SUBJECTS.find(s => s.id === assessment.reference_id);
          return {
            id: assessment.id.toString(),
            subjectId: assessment.reference_id,
            title: subject ? `${subject.title} Assessment` : 'Recent Activity',
            durationMinutes: 0, // Not available in assessment list
            isCompleted: true,
            lastAccessed: assessment.completed_at,
            difficulty: 'Intermediate' as any
          };
        });
      },
      error: (err) => console.log('Get Recent Assessments failed', err)
    });
  };

  getGoals = () => {
    this.goalService.getGoal(this.user?.id).subscribe({
      next: (res) => (this.goals = res),
      error: (err) => console.log('Get Goal service failed', err),
    });
  };

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
