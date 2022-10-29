import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    if (value === null || value === undefined) return -1;

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const pomArrayOB = value.split('.');
    const dayOB = parseInt(pomArrayOB[0]);
    const monthOB = monthNames[parseInt(pomArrayOB[1])];
    const yearOB = parseInt(pomArrayOB[2]);
    const dob = `${dayOB} ${monthOB} ${yearOB}`;
    const dobDate = new Date(dob);

    let today = new Date(Date.now());

    const msDob = today.getTime() - dobDate.getTime();

    const years = Math.floor(msDob / (1000 * 60 * 60 * 24 * 365));

    return years;
  }
}
