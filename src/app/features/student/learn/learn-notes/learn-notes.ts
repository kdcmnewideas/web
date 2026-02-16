import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Mic } from 'lucide-angular';

@Component({
  selector: 'app-learn-notes',
  imports: [LucideAngularModule],
  templateUrl: './learn-notes.html',
  styleUrl: './learn-notes.css',
})
export class LearnNotes {
  // Signal-based input for the notes content
  notes = input<string>('');

  // Output emitter for when notes change
  notesChange = output<string>();
  Mic = Mic;

  /**
   * Handles the textarea input event and emits the value
   */
  handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.notesChange.emit(textarea.value);
  }

  /**
   * Placeholder for the recording logic
   */
  onRecordClick(): void {
    console.log('Voice recording started...');
    // Logic for Web Speech API would go here
  }
}
