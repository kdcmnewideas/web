import { Component, inject, input, output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  imports: [LucideAngularModule],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css',
})
export class MobileNav {
  router = inject(Router);
  navigateTo = output<string>();
  mobileNavItems = input<Array<{ id: string; label: string; icon: LucideIconData }>>();
}
