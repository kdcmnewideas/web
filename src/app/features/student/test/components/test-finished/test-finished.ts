import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test-finished',
  imports: [ButtonModule],
  templateUrl: './test-finished.html',
  styleUrl: './test-finished.css',
})
export class TestFinished {
  score = input.required<number>();
  onRetry = output<void>();
  onReturn = output<void>();
}
