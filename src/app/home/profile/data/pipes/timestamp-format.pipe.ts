import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { format as fr } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timestampFormat',
})
export class TimestampFormatPipe implements PipeTransform {
  transform(value?: Timestamp, format?: string): string | undefined {
    if (!value) return undefined;
    return fr(value.toDate(), format ?? 'dd/MM/yyyy', {
      locale: es,
    });
  }
}
