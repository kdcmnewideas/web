import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {
data = input.required<{ label: string; value: number; color?: string }[]>();
  height = input<number>(50);
  className = input<string>('');

  max = computed(() => Math.max(...this.data().map(d => d.value)) || 1);
}
