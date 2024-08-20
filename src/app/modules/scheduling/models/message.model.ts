import { ScheduleType } from './schedule-type.model';

export class Message {
  id?: number;
  scheduleType: ScheduleType;
  messageTemplate: string;

  constructor(id: number, scheduleType: ScheduleType, messageTemplate: string) {
    this.id = id;
    this.scheduleType = scheduleType;
    this.messageTemplate = messageTemplate;
  }
}