import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-mcq',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './mcq.html',
  styleUrl: './mcq.css',
})
export class Mcq {

  // Signal-based inputs
  options = input<string[]>([]);
  answer = input<number | undefined>(undefined);

  // Output emitter for value changes
  answerChange = output<number>();

  // Reference for the icon
  readonly CheckCircle = CheckCircle;

  /**
   * Converts index to Letter (0 -> A, 1 -> B, etc.)
   */
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onSelect(index: number): void {
    this.answerChange.emit(index);
  }

}
