import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'monthtext'})
export class MonthtextPipe implements PipeTransform {
	transform(value: string, args: string[]): any {
		let map = [];
		map["01"] = "Января";
		map["02"] = "Февраля";
		map["03"] = "Марта";
		map["04"] = "Апреля";
		map["05"] = "Мая";
		map["06"] = "Июня";
		map["07"] = "Июля";
		map["08"] = "Августа";
		map["09"] = "Сентября";
		map["10"] = "Октобря";
		map["11"] = "Ноября";
		map["12"] = "Декабря";

		return map[value];
	}
}
