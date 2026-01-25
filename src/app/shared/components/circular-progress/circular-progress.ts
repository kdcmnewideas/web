import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  imports: [],
  templateUrl: './circular-progress.html',
  styleUrl: './circular-progress.css',
})
export class CircularProgress {
// Define Inputs as Signals
  percentage = input.required<number>();
  color = input.required<string>();
  size = input<number>(60);
  strokeWidth = input<number>(5);

  // Computed values automatically update when inputs change
  radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  circumference = computed(() => this.radius() * 2 * Math.PI);
  offset = computed(() =>
    this.circumference() - (this.percentage() / 100) * this.circumference()
  );
}
