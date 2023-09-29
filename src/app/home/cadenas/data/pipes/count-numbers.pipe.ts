import { Pipe, PipeTransform } from '@angular/core';

interface CountNumbersPipeResult {
  value: string;
  error: boolean;
}

@Pipe({
  name: 'countNumbers',
})
export class CountNumbersPipe implements PipeTransform {
  /**
   * Transforma una cadena de números separados por comas en una cadena que indica la cantidad de veces que se repite cada número en orden descendente.
   * @param {string} value Cadena de números separados por comas.
   * @returns {CountNumbersPipeResult} Cadena que indica la cantidad de veces que se repite cada número en orden descendente.
   */
  transform(
    value: string,
    ...args: never[]
  ): CountNumbersPipeResult | undefined {
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
