import { Component, inject, input, output } from '@angular/core';
import { Bell, LucideAngularModule } from 'lucide-angular';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, ButtonModule, AvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  icons = {
    Bell,
  };
  router = inject(Router);
  currentUser = input<any>();
  navigateTo = output<string>();
}
