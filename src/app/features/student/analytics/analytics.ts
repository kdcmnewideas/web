import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBookOpen,
  lucideDownload,
  lucideShare2,
  lucideSparkles,
  lucideTarget,
  lucideTrophy,
  lucideZap,
} from '@ng-icons/lucide';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.html',
  imports: [LineChart, DonutChart, CommonModule, CardModule, NgIcon, ButtonModule],
  viewProviders: [
    provideIcons({
      lucideSparkles,
      lucideShare2,
      lucideDownload,
      lucideTrophy,
      lucideTarget,
      lucideBookOpen,
      lucideZap,
      lucideArrowRight,
    }),
  ],
})
export class Analytics implements OnInit {
  @ViewChild('contentRef') contentRef!: ElementRef;

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

  ngOnInit() {
    this.calculateAnalytics();
  }

  private calculateAnalytics() {
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

    this.goalReadiness = Math.round(
      (this.goals.reduce((acc, g) => acc + g.current_score / g.target_score, 0) /
        this.goals.length) *
        100,
    );

    this.examReadiness = Math.round(
      (this.examHistory.slice(0, 3).reduce((acc, e) => acc + e.score, 0) / 3) * 0.95,
    );
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
