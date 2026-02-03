import { Component, computed, input, output, signal } from '@angular/core';
import { Topic } from '../../../../shared/constants/mock-data.constant';
import { BookOpen, ChevronDown, Circle, CircleCheck, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-learn-topics-list',
  imports: [LucideAngularModule],
  templateUrl: './learn-topics-list.html',
  styleUrl: './learn-topics-list.css',
})
export class LearnTopicsList {
  isOpen = signal<boolean>(false);
  topics = input<Topic[]>([]);
  activeTopicIndex = input<number>(0);
  onTopicSelect = output<number>();

  currentTopic = computed(() => this.topics()[this.activeTopicIndex()]);

  icons = {
    BookOpen,
    ChevronDown,
    CircleCheck,
    Circle
  };

  onTopicSelected = (idx: number) => {
    this.onTopicSelect.emit(idx);
    this.isOpen.set(false);
  };

  getIndex(idx: number){
   return String(idx + 1).padStart(2, '0')
  }
}
