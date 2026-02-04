import { Component, inject, signal } from '@angular/core';
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
  ChartNoAxesColumn,
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
    Search,
  };
  navItems = [
    { id: 'home', icon: House, label: 'Home' },
    { id: 'revision', icon: Calendar, label: 'Revision' },
    { id: 'analytics', icon: ChartNoAxesColumn, label: 'Results' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'ai-usage', icon: Cpu, label: 'AI Usage' },
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
