import { Component, computed, input, output, inject, OnInit } from '@angular/core';
import { Topic } from '../../../../shared/constants/mock-data.constant';
import { LucideAngularModule, Sparkles, Volume2 } from 'lucide-angular';
import { AiWrapperService } from '../../../../services/ai-wrapper/ai-wrapper.service';
import { IModuleRequest } from '../../../../core/interface/ai-wrapper.interface';

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
export class LearnReadMode implements OnInit {
  // Signal-based Input and Output
  topic = input.required<Topic>();
  readAloud = output<void>();
  aiWrapperService = inject(AiWrapperService);
  subject = input.required<string>();

  icons = {
    Volume2,
    Sparkles,
  };

  // Computed signal to parse content whenever topic changes
  parsedBlocks = computed(() => {
    const content = this.topic()?.content || '';
    return content.split('\n').map((line): ContentBlock => {
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
  });

  ngOnInit(): void {
    this.getData();
  }

  onReadAloudClick() {
    this.readAloud.emit();
  }

  getData() {
    const data: IModuleRequest = {
      subject: this.subject(),
      topic: this.topic()?.title,
    };
    this.aiWrapperService.getData(data).subscribe((data) => {
      console.log(data);
    });
  }
}
