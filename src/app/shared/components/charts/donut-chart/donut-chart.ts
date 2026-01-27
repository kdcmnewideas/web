import { Component, computed, input } from '@angular/core';

export interface DonutChartItem {
  value: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  imports: [],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart {
// Inputs (using the modern Signal-based inputs)
  data = input.required<DonutChartItem[]>();
  size = input<number>(180);
  strokeWidth = input<number>(20);
  centerLabel = input<string>();
  subLabel = input<string>();

  // Computed state (re-calculates automatically when inputs change)
  radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  circumference = computed(() => this.radius() * 2 * Math.PI);
  total = computed(() => this.data().reduce((acc, cur) => acc + cur.value, 0) || 100);

  // Logic to calculate individual segment offsets
  segments = computed(() => {
    let cumulativePercent = 0;
    const circ = this.circumference();
    const totalVal = this.total();

    return this.data().map(item => {
      const percent = item.value / totalVal;
      const dashArray = `${circ * percent} ${circ}`;
      const dashOffset = -circ * cumulativePercent;

      cumulativePercent += percent;

      return {
        ...item,
        dashArray,
        dashOffset
      };
    });
  });
}
