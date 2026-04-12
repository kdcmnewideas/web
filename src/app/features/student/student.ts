import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import {
  Calendar,
  Cpu,
  LucideAngularModule,
  Trophy,
  House,
  ChartNoAxesColumn,
} from 'lucide-angular';
import { MobileNav } from '../../shared/components/mobile-nav/mobile-nav';
import { SideNav } from '../../shared/components/side-nav/side-nav';

@Component({
  selector: 'app-student',
  imports: [RouterOutlet, TooltipModule, LucideAngularModule, MobileNav, SideNav],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  currentUser = CURRENT_USER;
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
