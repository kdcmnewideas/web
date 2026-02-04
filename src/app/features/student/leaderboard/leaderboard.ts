import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideTrophy,
  lucideCrown,
  lucideCoins,
  lucideTimer,
  lucideChevronRight,
  lucideTrendingUp,
  lucideHistory,
  lucideArrowLeft,
  lucideSparkles,
  lucideMapPin,
} from '@ng-icons/lucide';
import { CardModule } from 'primeng/card';
import { CURRENT_USER, LEADERBOARD_DATA } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-leaderboard',
  imports: [NgIcon, CardModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
  viewProviders: [
    provideIcons({
      lucideTrophy,
      lucideCrown,
      lucideCoins,
      lucideTimer,
      lucideChevronRight,
      lucideTrendingUp,
      lucideHistory,
      lucideArrowLeft,
      lucideSparkles,
      lucideMapPin,
    }),
  ],
})
export class Leaderboard {
  activeTab = signal('Global');
  sortedData = [...LEADERBOARD_DATA].sort((a, b) => b.points - a.points);
  CURRENT_USER = CURRENT_USER;
    first = this.sortedData[0];
   second = this.sortedData[1];
   third = this.sortedData[2];
   restOfPlayers = this.sortedData.slice(3);

  TABS = ['Global', 'Local', 'Schools', 'Friends'];

  router = inject(Router);

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
