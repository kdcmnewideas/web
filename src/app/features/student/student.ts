import { Component, inject, signal } from '@angular/core';
import { ScreenName } from '../../shared/constants/screen-names.constant';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideHome,
  lucideUser,
  lucideLogOut,
  lucideLayoutDashboard,
  lucideBarChart2,
  lucideUsers,
  lucideCalendar,
  lucideChevronLeft,
  lucideChevronRight,
  lucideShieldAlert
} from '@ng-icons/lucide'
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [NgIcon, RouterOutlet],
  templateUrl: './student.html',
  styleUrl: './student.css',
  viewProviders: [provideIcons({
  lucideHome,
  lucideUser,
  lucideLogOut,
  lucideLayoutDashboard,
  lucideBarChart2,
  lucideUsers,
  lucideCalendar,
  lucideChevronLeft,
  lucideChevronRight,
  lucideShieldAlert
})]
})
export class Student {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  navItems = [
    { id: ScreenName.HOME, icon: "lucideHome", label: 'Home' },
    { id: ScreenName.SUBJECTS, icon: "lucideLayoutDashboard", label: 'Subjects' },
    { id: ScreenName.CALENDAR, icon: "lucideCalendar", label: 'Schedule' },
    { id: ScreenName.ANALYTICS, icon: "lucideBarChart2", label: 'Results' },
    { id: ScreenName.COMMUNITY, icon: "lucideUsers", label: 'Leaderboard' },
    { id: ScreenName.PROFILE, icon: "lucideUser", label: 'Profile' },
  ];

  mobileNavItems = [
    this.navItems[0], // Home
    this.navItems[1], // Subjects
    this.navItems[3], // Results
    this.navItems[4], // Leaderboard
    this.navItems[5], // Profile
  ];

   navigateTo = (page: string) => {
    this.router.navigate([page])
  }

}
