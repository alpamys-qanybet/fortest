import { NumberTool } from './number.tool';

export class DateTool {
  static dateToString(d: Date, format: string): string {
    if (format == 'yyyy-mm-dd') {
      return d.getFullYear() + '-' + NumberTool.decima(d.getMonth() + 1) + '-' + NumberTool.decima(d.getDate());
    }
  }
}
