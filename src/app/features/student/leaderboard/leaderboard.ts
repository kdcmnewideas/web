import { Component, OnInit, effect, inject, signal } from '@angular/core';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { LeaderBoardService } from '../../../services/leader-board/leader-board.service';

@Component({
  selector: 'app-leaderboard',
  imports: [CardModule, LucideAngularModule, SelectButtonModule, FormsModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard implements OnInit {
  activeTab = signal('Global');
  sortedData: any[] = [...LEADERBOARD_DATA].sort((a, b) => b.points - a.points);
  CURRENT_USER = CURRENT_USER;
  first = this.sortedData[0];
  second = this.sortedData[1];
  third = this.sortedData[2];
  restOfPlayers = this.sortedData.slice(3);

  TABS = ['Global', 'Local', 'Schools', 'Friends'];

  router = inject(Router);
  leaderboardService = inject(LeaderBoardService);

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
  };

  constructor() {
    effect(() => {
      this.fetchLeaderboard(this.activeTab());
    });
  }

  ngOnInit() {
    this.fetchUserRank();
  }

  fetchLeaderboard(tab: string) {
    const scopeMap: Record<string, any> = {
      'Global': 'GLOBAL',
      'Local': 'LOCAL',
      'Schools': 'SCHOOL',
      'Friends': 'FRIENDS',
    };
    const scope = scopeMap[tab] || 'GLOBAL';

    const req = { org_id: 'org1', filter_user_ids: [] };
    this.leaderboardService.getTop10(req, scope).subscribe({
      next: (data) => {
        if (data && data.length) {
          const mappedData = data.map((d, index) => {
            const mockUser = LEADERBOARD_DATA.find((u) => u.id === d.user_id) || LEADERBOARD_DATA[index % LEADERBOARD_DATA.length];
            return {
              id: d.user_id,
              rank: d.rank || index + 1,
              name: mockUser?.name || 'Unknown User',
              points: d.score,
              change: mockUser?.change || 'same',
              location: mockUser?.location || 'Unknown',
              avatarUrl: mockUser?.avatarUrl || 'assets/images/user.jpeg',
            };
          }).sort((a, b) => b.points - a.points);

          this.sortedData = mappedData;
          this.first = this.sortedData[0] || ({} as any);
          this.second = this.sortedData[1] || ({} as any);
          this.third = this.sortedData[2] || ({} as any);
          this.restOfPlayers = this.sortedData.slice(3);
        }
      },
      error: (err) => {
        console.error('Failed to fetch leaderboard data. Falling back to mock data.', err);
      }
    });
  }

  fetchUserRank() {
    this.leaderboardService.getMyRank('org1', undefined, undefined, 'GLOBAL').subscribe({
      next: (data) => {
        if (data) {
          this.CURRENT_USER = {
            ...this.CURRENT_USER,
            rank: data.global_rank || this.CURRENT_USER.rank,
            totalPoints: data.current_score || this.CURRENT_USER.totalPoints,
          };
        }
      },
      error: (err) => {
        console.error('Failed to fetch user rank. Using mock data.', err);
      }
    });
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
