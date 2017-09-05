import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datetest'})
export class DatePipe implements PipeTransform {
	transform(value: number, args: string[]): any {
		let st = '';

		if (value <= 0) {
      return st;
		}

    let date = new Date(value);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    let hh = date.getHours();
    let mm = date.getMinutes();

    if (hh < 10) {
      st += "0" + hh;
    }
    st += ":";
    if (mm < 10) {
      st += "0" + mm;
    }
    st += " ";

    if (d < 10) {
      st += "0" + d;
    }
    st += ".";
    if (m < 10) {
      st += "0" + m;
    }
    st += "." + y;

		return st;
	}
}
