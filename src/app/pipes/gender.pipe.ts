import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'o': {
        return 'Non binary';
      }
      case 'm': {
        return 'Male';
      }
      case 'f': {
        return 'Female';
      }
      default: {
        return 'should not be here!';
      }
    }
  }
}
