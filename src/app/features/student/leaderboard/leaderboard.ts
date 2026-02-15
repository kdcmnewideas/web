import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Trophy,
  Crown,
  Coins,
  Timer,
  ChevronRight,
  TrendingUp,
  History,
  ArrowLeft,
  Sparkles,
  MapPin,
  LucideAngularModule,
} from 'lucide-angular';
import { CardModule } from 'primeng/card';
import { CURRENT_USER, LEADERBOARD_DATA } from '../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-leaderboard',
  imports: [CardModule, LucideAngularModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',

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

  icons = {
  Trophy,
  Crown,
  Coins,
  Timer,
  ChevronRight,
  TrendingUp,
  History,
  ArrowLeft,
  Sparkles,
  MapPin,
}

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
