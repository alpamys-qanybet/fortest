import { Pipe, PipeTransform } from '@angular/core';
import { NumberTool } from '../tools/number.tool';

@Pipe({name: 'timeago'})
export class TimeAgoPipe implements PipeTransform {
	transform(value: any, args: string): any {
        if (!value) {
            return 'Не указан';
        }
        var x = new Date(value).getTime();

/*
        var x = 0;
        if (value) {
            x = new Date(value).getTime();
        } else {
            x = new Date().getTime();
        }
*/
        var mode = 'full';
        if (args) {
            mode = args;
        }

        var templates = {
        seconds: "только что",
        minutes: "%d минут назад",
        hour: "1 час назад ",
        hours: " %dч. назад",
        day: "вчера",
        years: "%d г. назад"
    };

    var template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

		var now = new Date();
    var seconds = (Math.abs(now.getTime() - x) * .001) >> 0;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

		let map = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
			"Августа", "Сентября", "Октобря", "Ноября", "Декабря"
		];

		var old = function() {
			var d = new Date(x);

            if (mode == 'date') {
                return d.getDate() + ' ' + map[d.getMonth()].toLowerCase();
            } else if (mode == 'date-short') {
                return d.getDate() + ' ' + map[d.getMonth()].toLowerCase().substr(0,3);
            } else if (mode == 'time') {
                return NumberTool.decima(d.getHours()) + ':' + NumberTool.decima(d.getMinutes());
            }

            return d.getDate() + ' ' + map[d.getMonth()].toLowerCase() + ' ' + NumberTool.decima(d.getHours()) + ':' + NumberTool.decima(d.getMinutes());
        }

    return (
			seconds < 45 && template('seconds', seconds) ||
      minutes < 45 && template('minutes', minutes) ||
      minutes < 90 && template('hour', 1) ||
      hours < 24 && template('hours', hours) ||
      hours < 42 && template('day', 1) ||
			years > 1 && template('years', years) || old()
		);
	}
}
