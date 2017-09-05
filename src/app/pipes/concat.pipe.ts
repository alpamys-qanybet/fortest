import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'concat'})
export class ConcatPipe implements PipeTransform {
	transform(value: string, args: string[]): any {
		if (!value) return value;
		let n:number = 10;
		if (args) {
			n = +args;
		}
		if (n <= 4) {
			n = 5;
		}
		var s = value.substr(0, n-4);
		if (value.length >= n) {
			s += ' ...';
		}

		return s;
	}
}
