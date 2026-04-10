import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleCaseFirst', standalone: true })
export class TitleCaseFirstPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const lower = value.toLowerCase();
    // Find the first alphabetic character and uppercase it
    return lower.replace(/[a-z]/, (ch) => ch.toUpperCase());
  }
}
