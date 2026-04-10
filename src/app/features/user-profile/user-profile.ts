import { Component, inject, signal, OnInit } from '@angular/core';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Camera,
  Compass,
  Crown,
  ExternalLink,
  Flame,
  GraduationCap,
  Layers,
  LucideAngularModule,
  Mail,
  MapPin,
  Medal,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Star,
  Target,
  Zap,
  Lock,
  ChevronRight,
} from 'lucide-angular';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser, IUserProfileUpdate } from '../../core/interface/user-profile.interface';
import { UserDashboardService } from '../../services/user-dashboard/user-dashboard.service';
import { GoalService } from '../../services/goal/goal.service';
import { LeaderBoardService } from '../../services/leader-board/leader-board.service';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IAssessment } from '../../core/interface/assessment.interface';
import { IGoal } from '../../core/interface/goal.interface';

@Component({
  selector: 'app-user-profile',
  imports: [LucideAngularModule, CardModule, FormsModule, CommonModule, AvatarModule, ToastModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  user = signal<IUser | any>(CURRENT_USER);
  loading = signal(false);
  isSaving = signal(false);
  error = signal('');

  private authService = inject(AuthService);
  private dashboardService = inject(UserDashboardService);
  private goalService = inject(GoalService);
  private leaderboardService = inject(LeaderBoardService);
  private profileService = inject(UserProfileService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  achievements = [
    {
      name: 'Grandmaster',
      icon: Crown,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      desc: 'Top 0.1%',
    },
    {
      name: 'Atomic Habit',
      icon: Flame,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      desc: '30 Day Streak',
    },
    {
      name: 'Polymath',
      icon: Layers,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      desc: '5 Mastered',
    },
    {
      name: 'Early Riser',
      icon: Zap,
      color: 'text-teal-500',
      bg: 'bg-teal-50',
      desc: 'Morning Star',
    },
  ];

  skillBadges = ['Calculus', 'Quantum Physics', 'Literature', 'Data Sci', 'Organic Chem'];

  isEditing = false;

  icons = {
    Camera,
    BadgeCheck,
    MapPin,
    GraduationCap,
    ShieldCheck,
    Save,
    SquarePen,
    Settings,
    Compass,
    Mail,
    Phone,
    Medal,
    Star,
    ArrowUpRight,
    Target,
    ExternalLink,
    Lock,
    ChevronRight,
  };

  stats = [
    { label: 'Growth', icon: Flame, color: 'text-orange-500' },
    { label: 'Intellect', value: '1.4k', icon: Award, color: 'text-indigo-600' },
    { label: 'Milestones', icon: Target, color: 'text-emerald-600' },
    { label: 'Standing', icon: Sparkles, color: 'text-purple-600' },
  ];

  examResults = [
    { title: 'Calculus Quiz', score: '98%', date: 'Yesterday', color: 'bg-emerald-500' },
    { title: 'Physics Mock', score: '85%', date: '3 days ago', color: 'bg-indigo-500' },
    { title: 'Literature Essay', score: '92%', date: '1 week ago', color: 'bg-purple-500' },
  ];

  goals = [
    { label: 'Calculus', progress: 75, color: 'bg-indigo-500', glow: 'shadow-indigo-500/50' },
    { label: 'Quantum', progress: 42, color: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
    { label: 'History', progress: 88, color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
  ];

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (userData) => {
        this.user.set({ ...CURRENT_USER, ...userData });
        this.error.set('');
        this.loadProfileData();
      },
      error: (err) => {
        console.error('Failed to load user details:', err);
        this.error.set('Failed to load user details');
        this.loadProfileData(); // Try to load other data anyway
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  loadProfileData() {
    const userId = this.user().id;
    if (!userId) return;

    // 1. Fetch Stats
    this.dashboardService.getUserStats(userId).subscribe({
      next: (stats) => {
        this.stats = [
          { label: 'Growth', value: stats.average_score.toString() + '%', icon: Flame, color: 'text-orange-500' },
          { label: 'Intellect', value: stats.total_exams_taken.toString(), icon: Award, color: 'text-indigo-600' },
          { label: 'Milestones', value: stats.goals_met_count.toString(), icon: Target, color: 'text-emerald-600' },
          { label: 'Standing', value: '...', icon: Sparkles, color: 'text-purple-600' },
        ];
      }
    });

    // 2. Fetch Recent Exams
    this.dashboardService.getRecentExams(userId).subscribe({
      next: (assessments: IAssessment[]) => {
        this.examResults = assessments.slice(0, 3).map(a => ({
          title: `Assessment ${a.id}`,
          score: a.percentage.toString() + '%',
          date: a.completed_at.split('T')[0],
          color: a.percentage >= 80 ? 'bg-emerald-500' : 'bg-indigo-500'
        }));
      }
    });

    // 3. Fetch Goals
    this.goalService.getGoal(userId).subscribe({
      next: (goals: IGoal[]) => {
        this.goals = goals.slice(0, 3).map(g => ({
          label: g.target_type,
          progress: Math.round((g.current_score / (g.target_score || 1)) * 100),
          color: 'bg-indigo-500',
          glow: 'shadow-indigo-500/50'
        }));
      }
    });

    // 4. Fetch Rank
    this.leaderboardService.getMyRank(undefined, undefined, userId).subscribe({
      next: (rankData) => {
        const standingStat = this.stats.find(s => s.label === 'Standing');
        if (standingStat) {
          standingStat.value = rankData.global_rank.toString();
        }
      }
    });
  }

  saveProfile() {
    this.isSaving.set(true);
    const updateData: IUserProfileUpdate = {
      name: this.user().name,
      bio: this.user().bio,
      location: this.user().location,
      phone: this.user().phone,
      grade: this.user().grade
    };

    this.profileService.updateProfile(updateData).subscribe({
      next: (updatedUser) => {
        this.user.set({ ...this.user(), ...updatedUser });
        this.isEditing = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully'
        });
      },
      error: (err) => {
        console.error('Update profile failed:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile'
        });
      },
      complete: () => this.isSaving.set(false)
    });
  }

  getAvatarLabel(): string {
    const userData = this.user();
    if (userData?.email) {
      return userData.email[0].toUpperCase();
    }
    return userData?.name ? userData.name[0] : '?';
  }

  onNavigate(path: string) {
    // Handle sign out explicitly
    if (path === 'login') {
      this.authService.signOut();
      // navigate to auth login route
      this.router.navigate(['auth', 'login']);
      return;
    }

    // Default: attempt to navigate to a reasonable path mapping
    switch (path) {
      case 'settings':
        this.router.navigate(['settings']);
        break;
      case 'goals':
        this.router.navigate(['goals']);
        break;
      case 'change-password':
        this.router.navigate(['change-password']);
        break;
      case 'analytics':
        this.router.navigate(['analytics']);
        break;
      default:
        // fallback: try lowercased path
        this.router.navigate([String(path).toLowerCase()]);
    }
  }
}
