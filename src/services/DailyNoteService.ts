import { Event } from '../domain/Event';
import { Timestamp } from '../domain/Timestamp';

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
    return `### ${this.timestamp.getFormattedDate()}\n
    \n
    ${this.event.getEvent()}\n
    \n
    _更新時刻: ${this.timestamp.getFormattedTime()}_`;
  }

  public getTimestamp(): string {
    return this.timestamp.getRaw();
  }
}
