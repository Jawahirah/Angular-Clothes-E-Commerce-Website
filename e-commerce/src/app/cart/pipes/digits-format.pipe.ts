import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitsFormat'
})
export class DigitsFormatPipe implements PipeTransform {

  transform(value: number): unknown {
    return value.toFixed(2);
  }

}
