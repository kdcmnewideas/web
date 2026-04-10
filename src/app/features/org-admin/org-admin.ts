import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TooltipModule } from 'primeng/tooltip';
import { CURRENT_USER } from '../../shared/constants/mock-data.constant';
import { AvatarModule } from 'primeng/avatar';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LucideAngularModule,
  Users,
  BookOpen,
  Settings,
  GraduationCap,
  ChartNoAxesCombined,
  LayoutDashboardIcon,
  Presentation,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { MobileNav } from '../../shared/components/mobile-nav/mobile-nav';
import { SideNav } from '../../shared/components/side-nav/side-nav';
import { AuthService } from '../../services/auth/auth.service';
import { OrganizationService } from '../../services/organization/organization.service';
import { OrganizationRole } from '../../shared/constants/roles.constant';
import { IOrganization } from '../../core/interface/organization.interface';

@Component({
  selector: 'app-org-admin',
  imports: [
    FormsModule,
    LucideAngularModule,
    RouterOutlet,
    TooltipModule,
    ButtonModule,
    AvatarModule,
    Header,
    MobileNav,
    SideNav,
  ],
  templateUrl: './org-admin.html',
  styleUrl: './org-admin.css',
})
export class OrgAdmin implements OnInit {
  isSidebarCollapsed = signal<boolean>(false);
  router = inject(Router);
  authService = inject(AuthService);
  organizationService = inject(OrganizationService);
  currentUser = CURRENT_USER;
  organizationDetails = signal<IOrganization | null>(null);

  icons = {
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
  };
  navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'users', label: 'Members', icon: Users },
    { id: 'classes', label: 'Classes', icon: Presentation },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  mobileNavItems = this.navItems;

  ngOnInit() {
    this.loadOrganizationDetails();
  }

  /**
   * Fetch organization details if user is org_admin
   */
  loadOrganizationDetails() {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        // Check if user has org_admin or org_faculty role
        if (
          user.platform_role === OrganizationRole.ORG_ADMIN ||
          user.platform_role === OrganizationRole.ORG_FACULTY
        ) {
          const orgId = user.memberships?.[0]?.org_id || environment.orgId;

          this.organizationService.getOrganization(orgId).subscribe({
            next: (orgData) => {
              this.organizationDetails.set(orgData);
              console.log('Organization details loaded:', orgData);
            },
            error: (error) => {
              console.error('Error loading organization details:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error getting user details:', error);
      },
    });
  }

  navigateTo = (page: string) => {
    this.router.navigate(['org-admin', page]);
  };
}
