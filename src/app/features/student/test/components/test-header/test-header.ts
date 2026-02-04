import { Component, input, computed } from '@angular/core';
import { Clock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-test-header',
  imports: [LucideAngularModule],
  templateUrl: './test-header.html',
  styleUrl: './test-header.css',
})
export class TestHeader {
  currentIdx = input.required<number>();
  totalQuestions = input.required<number>();
  timeLeft = input.required<number>();
  Clock = Clock

  formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  progress = computed(() => Math.round(((this.currentIdx() + 1) / this.totalQuestions()) * 100));
}
