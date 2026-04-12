import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, Layers, Users, Building2 } from 'lucide-angular';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { MobileNav } from '../../shared/components/mobile-nav/mobile-nav';
import { SideNav } from '../../shared/components/side-nav/side-nav';

@Component({
  selector: 'app-admin',
  imports: [LucideAngularModule, RouterOutlet, TooltipModule, MobileNav, SideNav],
  templateUrl: './platform-admin.html',
  styleUrl: './platform-admin.css',
})
export class PlatformAdmin {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  currentUser = CURRENT_USER;
  navItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'boards', label: 'Boards', icon: Layers },
    { id: 'org', label: 'Organization', icon: Building2 },
  ];

  mobileNavItems = this.navItems;
  navigateTo = (page: string) => {
    this.router.navigate(['admin', page]);
  };
}
