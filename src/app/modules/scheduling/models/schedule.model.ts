import { Member } from './member.model';
import { ScheduleType } from './schedule-type.model';

export class Schedule {
  id?: number;
  members: Member[];
  scheduleType: ScheduleType;
  dayNumber: string;
  scheduledTime: string;

  constructor(id: number, members: Member[], scheduleType: ScheduleType, dayNumber: string, scheduledTime: string) {
    this.id = id;
    this.members = members;
    this.scheduleType = scheduleType;
    this.dayNumber = dayNumber;
    this.scheduledTime = scheduledTime;
  }
}