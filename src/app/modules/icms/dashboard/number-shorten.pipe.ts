import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberShorten'
})
export class NumberShortenPipe implements PipeTransform {

  transform(value: number | null | undefined, decimalPlaces: number = 1): string {
    if (value === null || value === undefined) {
      return ''; // Handle null or undefined
    }

    const numValue = Number(value);
    if (isNaN(numValue)) {
      return ''; // Handle invalid numbers
    }

    if (numValue >= 1_000_000_000_000) { // 1 trillion
      return (numValue / 1_000_000_000_000).toFixed(decimalPlaces) + 'T';
    } else if (numValue >= 1_000_000_000) { // 1 billion
      return (numValue / 1_000_000_000).toFixed(decimalPlaces) + 'B';
    } else if (numValue >= 1_000_000) { // 1 million
      return (numValue / 1_000_000).toFixed(decimalPlaces) + 'M';
    } else {
      return numValue.toString(); // For values less than a million
    }
  }
}
