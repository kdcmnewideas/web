import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {lucideBookOpen, lucideClock, lucideTarget} from '@ng-icons/lucide';
import { CircularProgress } from '../../../../../shared/components/circular-progress/circular-progress';
import { IGoal } from '../../../../../core/interface/goal.interface';
import {CardModule} from 'primeng/card';
import {TagModule} from 'primeng/tag';

@Component({
  selector: 'app-goal',
  imports: [NgIcon, CircularProgress, CardModule, TagModule],
  templateUrl: './goal.html',
  styleUrl: './goal.css',
  viewProviders: [provideIcons({lucideBookOpen, lucideClock, lucideTarget})]
})
export class Goal {
  index = input<number>(0);
  goal = input<IGoal | null>();
  percentage = computed(() =>
    this.goal() ? Math.round((this.goal()!.current_score / this.goal()!.target_score) * 100) : 0,
  );
  color = computed(() =>
    (this.percentage() >= 100 || this.goal()!.is_achieved)
      ? 'text-emerald-500'
      : this.percentage() >= 50
        ? 'text-indigo-600'
        : 'text-orange-500',
  );
  daysLeft = computed(() => {
    if(!this.goal()) return 0
    const diff = new Date(this.goal()!.deadline).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  });
}
