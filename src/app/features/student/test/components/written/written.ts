import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-written',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './written.html',
  styleUrl: './written.css',
})
export class Written {
  // Signal-based input (defaults to empty string)
  answer = input<string | undefined>('');

  // Output to notify parent of changes
  answerChange = output<string>();

  // Icon reference
  readonly FileTextIcon = FileText;

  /**
   * Captures the input event and emits the value
   */
  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.answerChange.emit(value);
  }
}
