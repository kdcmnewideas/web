import { Component, inject, signal } from '@angular/core';
import { ScreenName } from '../../shared/constants/screen-names.constant';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Search,
  Bell,
  LucideAngularModule,
  Trophy,
  House,
  ChartNoAxesColumn
} from 'lucide-angular';

@Component({
  selector: 'app-student',
  imports: [RouterOutlet, TooltipModule, LucideAngularModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  currentUser = CURRENT_USER;
  icons = {
    ChevronLeft,
  ChevronRight,
  Bell,
  Search
  }
  navItems = [
    { id: ScreenName.HOME, icon: House, label: 'Home' },
    { id: ScreenName.REVISION, icon: Calendar, label: 'Revsion' },
    { id: ScreenName.ANALYTICS, icon: ChartNoAxesColumn, label: 'Results' },
    { id: ScreenName.LEADERBOARD, icon: Trophy, label: 'Leaderboard' },
    { id: ScreenName.AI_USAGE, icon: Cpu, label: 'AI Usage' },
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
