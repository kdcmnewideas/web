import { Component, inject, input, model, output } from '@angular/core';
import { Router } from '@angular/router';
import { ChevronLeft, ChevronRight, LucideAngularModule, LucideIconData } from 'lucide-angular';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-side-nav',
  imports: [LucideAngularModule, TooltipModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  isSidebarCollapsed = model<boolean>(false);
  router = inject(Router);
  navigateTo = output<string>();
  navItems = input<Array<{ id: string; label: string; icon: LucideIconData }>>();

  icons = {
    ChevronLeft,
    ChevronRight,
  };
}
