import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberShorten'
})
export class NumberShortenPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1_000_000_000_000) { // 1 trillion
      return (value / 1_000_000_000_000).toFixed(1) + 'T';
    } else if (value >= 1_000_000_000) { // 1 billion
      return (value / 1_000_000_000).toFixed(1) + 'B';
    } else if (value >= 1_000_000) { // 1 million
      return (value / 1_000_000).toFixed(1) + 'M';
    } else {
      return value.toString();
    }
  }

}
