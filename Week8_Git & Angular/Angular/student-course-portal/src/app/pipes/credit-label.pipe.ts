import { Pipe, PipeTransform } from '@angular/core';

// Custom pipe: converts a numeric credit value to a descriptive label
// Usage: {{ course.credits | creditLabel }}
// Output: "4 Credits (Heavy Load)"
@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number): string {
    if (credits <= 0) return 'No Credits';
    if (credits === 1) return '1 Credit (Light)';
    if (credits === 2) return '2 Credits (Moderate)';
    if (credits === 3) return `3 Credits (Standard)`;
    if (credits === 4) return `4 Credits (Heavy Load)`;
    return `${credits} Credits (Intensive)`;
  }
}
