import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  PERFORMANCE_STATS,
  EXAM_HISTORY,
  SUBJECTS,
  GOALS,
} from '../../../shared/constants/mock-data.constant';
import html2canvas from 'html2canvas';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';
import { DonutChart } from '../../../shared/components/charts/donut-chart/donut-chart';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  LucideAngularModule,
  ArrowRight,
  BookOpen,
  Download,
  Share2,
  Sparkles,
  Target,
  Trophy,
  Zap,
  Clock,
  GraduationCap,
  CircleCheck,
  TrendingUp,
  ChartBar,
  ChevronRight,
  X,
  HistoryIcon,
} from 'lucide-angular';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';
import { ExamAnalytics } from './exam-analytics/exam-analytics';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDashboardService } from '../../../services/user-dashboard/user-dashboard.service';
import { UserAnalyticsService } from '../../../services/user-analytics/user-analytics.service';
import { IAssessment } from '../../../core/interface/assessment.interface';
import { IScoreTrend, IUserStats, IMasteryReport } from '../../../core/interface/user-dashboard.interface';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.html',
  imports: [
    LineChart,
    DonutChart,
    CommonModule,
    CardModule,
    ButtonModule,
    LucideAngularModule,
    BarChart,
    ExamAnalytics,
    DialogModule,
  ],
  viewProviders: [],
})
export class Analytics implements OnInit {
  @ViewChild('contentRef') contentRef!: ElementRef;

  private authService = inject(AuthService);
  private dashboardService = inject(UserDashboardService);
  private analyticsService = inject(UserAnalyticsService);
  
  userId: string = '';
  loading = true;

  icons = {
    ArrowRight,
    BookOpen,
    Download,
    Share2,
    Sparkles,
    Target,
    Trophy,
    Zap,
    Clock,
    GraduationCap,
    CircleCheck,
    TrendingUp,
    ChartBar,
    ChevronRight,
    X,
    HistoryIcon,
  };

  // Data bindings
  stats = PERFORMANCE_STATS;
  examHistory = EXAM_HISTORY;
  subjects = SUBJECTS;
  goals = GOALS;

  showHistoryModal = false;

  // Calculated Chart Data
  trendData: number[] = [];
  timeData: any[] = [];
  masteryData: any[] = [];
  goalReadiness = 0;
  examReadiness = 0;

  private colorMap: Record<string, string> = {
    'text-emerald-500': '#10b981',
    'text-indigo-500': '#6366f1',
    'text-amber-500': '#f59e0b',
    'text-rose-500': '#f43f5e',
    'text-slate-500': '#64748b',
  };

  styles = [
    'text-emerald-500',
    'text-indigo-500',
    'text-amber-500',
    'text-rose-500',
    'text-slate-500',
  ];

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.userId = user.id;
        this.loadDashboardData();
      },
      error: (err) => console.error('Auth check failed', err)
    });
  }

  private loadDashboardData() {
    this.loading = true;
    
    // 1. Get Stats
    this.dashboardService.getUserStats(this.userId).subscribe({
      next: (stats) => {
        this.stats.averageScore = stats.average_score;
        this.stats.totalExams = stats.total_exams_taken;
        // goals_met_count is available too if needed
      }
    });

    // 2. Get Trend
    this.dashboardService.getScoreTrend(this.userId).subscribe({
      next: (trend) => {
        this.trendData = trend.map(t => t.score);
      }
    });

    // 3. Get Recent Exams
    this.dashboardService.getRecentExams(this.userId).subscribe({
      next: (assessments) => {
        this.examHistory = assessments.map(a => ({
          id: a.id.toString(),
          date: a.completed_at.split('T')[0],
          subjectId: a.reference_id,
          score: a.percentage,
          totalQuestions: 10, // Placeholder
          timeSpentSeconds: 600 // Placeholder
        }));
        this.calculateDerivedStats();
      }
    });

    // 4. Get Mastery
    this.dashboardService.getMastryReport(this.userId).subscribe({
      next: (report) => {
        this.mapMasteryReport(report);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  private mapMasteryReport(report: IMasteryReport) {
    // Analytics has labels: Mastered, Learning, Beginner
    // We map subject statuses to these counts
    let mastered = 0;
    let learning = 0;
    let beginner = 0;

    report.subject_breakdown.forEach(s => {
      if (s.mastery_status === 'mastered') mastered++;
      else if (s.mastery_status === 'learning') learning++;
      else beginner++;
    });

    const total = report.subject_breakdown.length || 1;
    this.stats.masteryDistribution = [
      { label: 'Mastered', value: Math.round((mastered / total) * 100), color: 'text-emerald-500' },
      { label: 'Learning', value: Math.round((learning / total) * 100), color: 'text-indigo-500' },
      { label: 'Beginner', value: Math.round((beginner / total) * 100), color: 'text-amber-500' },
    ];

    this.masteryData = this.stats.masteryDistribution.map((item) => ({
      value: item.value,
      color: this.colorMap[item.color] || '#cbd5e1',
    }));
  }

  private calculateDerivedStats() {
    this.goalReadiness = Math.round(
      (this.goals.reduce((acc, g) => acc + g.current_score / g.target_score, 0) /
        this.goals.length) *
        100,
    );

    if (this.examHistory.length > 0) {
      this.examReadiness = Math.round(
        (this.examHistory.slice(0, 3).reduce((acc, e) => acc + e.score, 0) / 
        Math.min(this.examHistory.length, 3)) * 0.95,
      );
    }
  }

  private calculateAnalytics() {
    // This is now replaced by loadDashboardData and derived calculations
    // But I'll keep the core chart mapping logic if needed for initial display
    this.trendData = [...this.examHistory].reverse().map((e) => e.score);

    this.timeData = this.stats.subjectTimeDistribution.map((s) => ({
      label: s.subjectName.substring(0, 3),
      value: s.hours,
      color: s.color,
    }));

    this.masteryData = this.stats.masteryDistribution.map((item) => ({
      value: item.value,
      color: this.colorMap[item.color] || '#cbd5e1',
    }));
  }

  getSubject(subjectId: string) {
    return this.subjects.find((s) => s.id === subjectId);
  }

  async handleCapture(type: 'download' | 'share') {
    if (!this.contentRef.nativeElement) return;

    try {
      const canvas = await html2canvas(this.contentRef.nativeElement, {
        scale: 2,
        backgroundColor: '#f8fafc',
        useCORS: true,
        logging: false,
      });

      const fileName = `StudyMate_Analytics_${new Date().toISOString().split('T')[0]}.png`;

      if (type === 'download') {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], fileName, { type: 'image/png' });
          const shareData = { files: [file], title: 'My StudyMate Performance' };

          if (navigator.canShare && navigator.canShare(shareData)) {
            try {
              await navigator.share(shareData);
            } catch (err) {
              console.error(err);
            }
          } else {
            // Fallback to download
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            link.click();
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  onNavigate(screen: string) {}
}
