import { Component, computed, input, output, signal } from '@angular/core';
import { Topic } from '../../../../shared/constants/mock-data.constant';
import { LucideAngularModule, Sparkles, Volume2 } from 'lucide-angular';

interface ContentBlock {
  type: 'h3' | 'callout' | 'spacer' | 'p';
  text?: string;
  parts?: Array<{ text: string; isBold: boolean }>;
}

@Component({
  selector: 'app-learn-read-mode',
  imports: [LucideAngularModule],
  templateUrl: './learn-read-mode.html',
  styleUrl: './learn-read-mode.css',
})
export class LearnReadMode {
  // Signal-based Input and Output
  topic = input.required<Topic>();
  readAloud = output<void>();
  subject = input.required<string>();
  content = input.required<any>();
  image = input<any>();

  dataTypes = ['analogy', 'deep_dive', 'mechanism'];
  currentDataIndex = signal(0);

  icons = {
    Volume2,
    Sparkles,
  };

  // Computed signal to parse content whenever topic changes
  parsedBlocks = computed(() => {
    return this.modifyingContnet(this.content()?.[this.dataTypes[this.currentDataIndex()]]);
  });

  onReadAloudClick() {
    this.readAloud.emit();
  }

  handleRegenerateClick() {
    this.currentDataIndex.set((this.currentDataIndex() + 1) % this.dataTypes.length);
  }

  modifyingContnet(data: string) {
    const content = data || '';
    return content.split('\n').map((line: string): ContentBlock => {
      const trimmed = line.trim();

      if (trimmed.startsWith('###')) {
        return { type: 'h3', text: trimmed.replace('###', '').trim() };
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return { type: 'callout', text: trimmed.replace(/\*\*/g, '') };
      }

      if (trimmed === '') {
        return { type: 'spacer' };
      }

      // Handle inline bold text: split by ** markers
      const segments = line.split(/(\*\*.*?\*\*)/g);
      const parts = segments.map((part) => ({
        text: part.replace(/\*\*/g, ''),
        isBold: part.startsWith('**') && part.endsWith('**'),
      }));

      return { type: 'p', parts };
    });
  }
}
