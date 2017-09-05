export class NumberTool {
  static decima(n: number): string {
    if (n < 10) {
      return '0'+n;
    }

    return n+'';
  }
}
