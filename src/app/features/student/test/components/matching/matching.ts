import { Component, input, signal, output } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

@Component({
  selector: 'app-matching',
  imports: [LucideAngularModule],
  templateUrl: './matching.html',
  styleUrl: './matching.css',
})
export class Matching {
  // Inputs as Signals
  pairs = input.required<MatchingPair[]>();
  answer = input<Record<string, string>>({});

  // Output to update parent state
  answerChange = output<Record<string, string>>();

  // Internal Local State
  selectedLeft = signal<string | null>(null);
  readonly checkIcon = Check;

  handleLeftSelect(val: string) {
    this.selectedLeft.set(val);
  }

  handleMatch(rightId: string) {
    const currentLeft = this.selectedLeft();
    if (!currentLeft) return;

    // Emit the new map to the parent
    const updatedMap = { ...this.answer(), [currentLeft]: rightId };
    this.answerChange.emit(updatedMap);

    // Reset selection
    this.selectedLeft.set(null);
  }

  // Helper to check if a right-side item is already used
  isRightMatched(rightVal: string): boolean {
    return Object.values(this.answer()).includes(rightVal);
  }
}
