import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Box, CircleCheck, CirclePlay, Clock, Lock, LucideAngularModule, PenTool, RotateCw } from 'lucide-angular';

@Component({
  selector: 'app-lesson-card',
  imports: [LucideAngularModule],
  templateUrl: './lesson-card.html',
  styleUrl: './lesson-card.css',
})
export class LessonCard {
  router = inject(Router);
  lesson = input.required<any>();
  index = input.required<number>();
  isStarted = computed(() => !this.lesson().isCompleted && this.lesson().lastAccessed);
  isLocked = computed(() => !this.lesson().isCompleted && !this.isStarted() && this.index() > 2);
  progress = computed(() => (this.lesson().isCompleted ? 100 : this.isStarted() ? 35 : 0));

  icons = {
    CircleCheck,
    Lock,
    CirclePlay,
    Clock,
    Box,
    PenTool,
    RotateCw
  };

  serialNumber = computed(() => String(this.index() + 1).padStart(2, '0'));

  onNavigate(path: string, id: string | number) {
    this.router.navigate([path, id]);
  }
}
