import { Component, input, model, output } from '@angular/core';
import { Layers, ListFilter, Mic, Zap, LucideAngularModule, Award, CircleCheck } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';

export type TestCategory = 'MIXED' | 'MCQ' | 'WRITTEN_ORAL' | 'INTERACTIVE';

@Component({
  selector: 'app-test-intro',
  imports: [LucideAngularModule, ButtonModule],
  templateUrl: './test-intro.html',
  styleUrl: './test-intro.css',
})
export class TestIntro {
  lessonTitle = input<string>('');
  selectedCategory = model<TestCategory>('MIXED');
  onStart = output<void>();
  onCancel = output<void>();

  categories: { id: TestCategory; label: string; desc: string; icon: any }[] = [
    { id: 'MIXED', label: 'Comprehensive', desc: 'Mixed questions of all formats', icon: Layers },
    { id: 'MCQ', label: 'MCQs Only', desc: 'Multiple choice questions', icon: ListFilter },
    { id: 'WRITTEN_ORAL', label: 'Expression', desc: 'Written & Oral submissions', icon: Mic },
    { id: 'INTERACTIVE', label: 'Interactive', desc: 'Match, Blanks & T/F', icon: Zap },
  ];

  icons = {
    Award,
    CircleCheck
  }
}
