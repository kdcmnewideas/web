import { Component, inject, signal } from '@angular/core';
import { ScreenName } from '../../shared/constants/screen-names.constant';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  bootstrapTrophy,
  bootstrapTrophyFill,
  bootstrapPerson,
  bootstrapPersonFill,
  bootstrapBarChart,
  bootstrapBarChartFill,
  bootstrapCalendar,
  bootstrapCalendarFill,
  bootstrapHouse,
  bootstrapHouseFill,
  bootstrapCpu,
  bootstrapCpuFill,
  bootstrapChevronRight,
  bootstrapChevronLeft,
  bootstrapSearch,
  bootstrapBell
} from '@ng-icons/bootstrap-icons';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-student',
  imports: [NgIcon, RouterOutlet, TooltipModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
  viewProviders: [
    provideIcons({
      bootstrapTrophy,
      bootstrapTrophyFill,
      bootstrapPerson,
      bootstrapPersonFill,
      bootstrapBarChart,
      bootstrapBarChartFill,
      bootstrapCalendar,
      bootstrapCalendarFill,
      bootstrapHouse,
      bootstrapHouseFill,
      bootstrapCpu,
      bootstrapCpuFill,
      bootstrapChevronRight,
      bootstrapChevronLeft,
      bootstrapSearch,
      bootstrapBell
    }),
  ],
})
export class Student {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  navItems = [
    { id: ScreenName.HOME, icon: 'bootstrapHouse', label: 'Home' },
    { id: ScreenName.CALENDAR, icon: 'bootstrapCalendar', label: 'Schedule' },
    { id: ScreenName.ANALYTICS, icon: 'bootstrapBarChart', label: 'Results' },
    { id: ScreenName.LEADERBOARD, icon: 'bootstrapTrophy', label: 'Leaderboard' },
    { id: ScreenName.AI_USAGE, icon: 'bootstrapCpu', label: 'AI Usage' },
  ];

  mobileNavItems = [
    this.navItems[0], // Home
    this.navItems[2], // Results
    this.navItems[3], // Leaderboard
    this.navItems[4], // AI Usage
  ];

  navigateTo = (page: string) => {
    this.router.navigate([page]);
  };
}
