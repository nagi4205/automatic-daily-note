import { Event } from '../domain/Event.js';
import { Timestamp } from '../domain/Timestamp.js';

export class DailyNoteService {
  private timestamp: Timestamp;
  private event: Event;

  private constructor() {
    this.timestamp = Timestamp.now();
    this.event = Event.create();
  }

  public static create(): DailyNoteService {
    return new DailyNoteService();
  }

  public generateDailyNote(): string {
    return `### ${this.timestamp.getFormattedDate()}\n${this.event.getEvent()}\n\n_更新時刻: ${this.timestamp.getFormattedTime()}_`;
  }

  public getTimestamp(): string {
    return this.timestamp.getRaw();
  }
}
