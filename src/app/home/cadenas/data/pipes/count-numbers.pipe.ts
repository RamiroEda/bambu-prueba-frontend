import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countNumbers',
})
export class CountNumbersPipe implements PipeTransform {
  transform(value: string, ...args: never[]): string {
    if (!value) return '';

    try {
      const numbers = value
        .split(',')
        .filter((it) => it.trim())
        .map((it) => it.trim())
        .map((it) => Number(it))
        .filter((it) => !isNaN(it));

      const counts: Map<number, number> = numbers.reduce((acc, curr) => {
        acc.set(curr, (acc.get(curr) ?? 0) + 1);
        return acc;
      }, new Map<number, number>());

      return [...counts.entries()]
        .sort(([keyA], [keyB]) => keyB - keyA)
        .map(([key, value]) => `${key}-${value}`)
        .join(', ');
    } catch (e) {
      return 'Formato incorrecto';
    }
  }
}
