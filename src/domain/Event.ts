import { defaultEvents } from '../const/event.js';

export class Event {
  private event: string;

  private constructor(event: string) {
    this.event = event;
  }

  // 現状の実装ではdefaultEventsが使われているため、それ以外のイベントは返さない
  public static create(): Event {
    return new Event(defaultEvents);
  }

  public getEvent(): string {
    return this.event;
  }
}
