export class Timestamp {
  private readonly timestamp: string;

  private constructor() {
    this.timestamp = new Date().toISOString();
  }

  public static now(): Timestamp {
    return new Timestamp();
  }

  public getRaw(): string {
    return this.timestamp;
  }

  public getFormattedDate(): string {
    const date = new Date(this.timestamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  public getFormattedTime(): string {
    const date = new Date(this.timestamp);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
      date.getDate(),
    ).padStart(2, '0')} ${date.toTimeString().slice(0, 5)}`;
  }
}
