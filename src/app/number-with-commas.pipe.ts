import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';

    const num = typeof value === 'string' ? parseFloat(value) : value;

    return num.toLocaleString('en-US');
  }
}
