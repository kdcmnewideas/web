import { Component, inject, signal } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LucideAngularModule,
  BookOpen,
  GraduationCap,
  Layers,
  Users,
  Grid3x3,
} from 'lucide-angular';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app--org-admin',
  imports: [LucideAngularModule, RouterOutlet, TooltipModule, ButtonModule, AvatarModule],
  templateUrl: './org-admin.html',
  styleUrl: './org-admin.css',
})
export class OrgAdmin {
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
    { id: 'users', label: 'Users', icon: Users },
    { id: 'boards', label: 'Boards', icon: Layers },
    { id: 'classes', label: 'Classes', icon: GraduationCap },
    { id: 'sections', label: 'Sections', icon: Grid3x3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  mobileNavItems = this.navItems;
  navigateTo = (page: string) => {
    this.router.navigate(['admin', page]);
  };
}
