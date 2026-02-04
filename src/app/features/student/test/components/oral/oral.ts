import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mic, Square, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-oral',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './oral.html',
  styleUrl: './oral.css',
})
export class Oral {
// Signal-based Inputs
  isRecording = input.required<boolean>();
  recordingTime = input.required<number>();
  answer = input<string | undefined>(undefined);

  // Outputs (Replacing React callback props)
  toggleRecording = output<boolean>();
  answerChange = output<string>();

  // Icon References
  readonly MicIcon = Mic;
  readonly SquareIcon = Square;
  readonly CheckIcon = CheckCircle;

  handleToggle(): void {
    const nextState = !this.isRecording();

    // If we are currently recording and about to stop, save the answer
    if (this.isRecording()) {
      this.answerChange.emit('recorded_audio');
    }

    this.toggleRecording.emit(nextState);
  }
}
