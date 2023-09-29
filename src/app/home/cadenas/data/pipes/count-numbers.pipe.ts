import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countNumbers',
})
export class CountNumbersPipe implements PipeTransform {
  transform(
    value: string,
    ...args: never[]
  ):
    | {
        value: string;
        error: boolean;
      }
    | undefined {
    if (!value) return undefined;

    try {
      let error = false;

      const numbers = value
        .split(',')
        .map((it) => it.trim())
        .filter((it) => {
          const number = Number(it);
          if (isNaN(number)) {
            error = true;
            return false;
          }
          return true;
        })
        .map((it) => Number(it))
        .filter((it) => !isNaN(it));

      const counts: Map<number, number> = numbers.reduce((acc, curr) => {
        acc.set(curr, (acc.get(curr) ?? 0) + 1);
        return acc;
      }, new Map<number, number>());

      return {
        value: [...counts.entries()]
          .sort(([keyA], [keyB]) => keyB - keyA)
          .map(([key, value]) => `${key}-${value}`)
          .join(', '),
        error,
      };
    } catch (e) {
      return {
        value: 'Formato incorrecto',
        error: true,
      };
    }
  }
}
