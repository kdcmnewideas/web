import { Component, computed, Input, input, signal } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart {
   color = input<string>('#4f46e5');
   className = input<string>('');

  data = input<number[]>([]);

  readonly viewWidth = 100;
  readonly viewHeight = 50;

  // Computed logic replaces the variable declarations in React's render body
  points = computed(() => {
    const d = this.data();
    if (d.length < 2) return '';

    const max = Math.max(...d);
    const min = Math.min(...d);
    const range = max - min || 1;
    const paddingY = this.viewHeight * 0.2;
    const availableHeight = this.viewHeight - (paddingY * 2);

    return d.map((val, idx) => {
      const x = (idx / (d.length - 1)) * this.viewWidth;
      const normalizedVal = (val - min) / range;
      const y = (this.viewHeight - paddingY) - (normalizedVal * availableHeight);
      return `${x},${y}`;
    }).join(' ');
  });

  areaPath = computed(() => {
    return `0,${this.viewHeight} ${this.points()} ${this.viewWidth},${this.viewHeight}`;
  });
}
