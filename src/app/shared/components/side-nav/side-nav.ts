import { Component, inject, input, model, output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  LucideAngularModule,
  LucideIconData,
} from 'lucide-angular';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  imports: [LucideAngularModule, TooltipModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  isSidebarCollapsed = model<boolean>(false);
  router = inject(Router);
  authService = inject(AuthService);
  navigateTo = output<string>();
  navItems = input<Array<{ id: string; label: string; icon: LucideIconData }>>();

  icons = {
    ChevronLeft,
    ChevronRight,
    LogOut,
  };

  logout() {
    this.authService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
