import { Pipe, PipeTransform } from '@angular/core';
import { Interest } from '../models/interest';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: Interest[], field: string): any[] {
    if (array === undefined || array === null) return array;

    array.sort((a: any, b: any) => {
      if (a.category < b.category) {
        return -1;
      } else if (a.category > b.category) {
        return 1;
      } else {
        return 0;
      }
    });

    return array;
  }
}
