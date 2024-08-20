import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ScheduleTypeService } from '../../services/schedule-type.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { MessageService } from 'primeng/api';
import { ScheduleTypeFormComponent } from '../schedule-type-form/schedule-type-form.component';
import { MemberFormComponent } from '../member-form/member-form.component';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { MessageFormComponent } from '../message-form/message-form.component';
@Component({
  selector: 'app-today-schedules',
  templateUrl: './today-schedules.component.html',
  styleUrls: ['./today-schedules.component.scss']
})
export class TodaySchedulesComponent implements OnInit {

  constructor(
    private scheduleTypeService: ScheduleTypeService,
    private scheduleService: ScheduleService,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private MemberService: MemberService,
    private messageService: MessageService,

    private router: Router,) { }
todayScheduleList:any;

selectedSchedule: any;
displayActions: boolean = false;


  ngOnInit(): void {
   this.getTodayScheduleList();
  }

  formatTime(timeArray: number[]): string {
    if (timeArray && timeArray.length === 2) {
      const [hours, minutes] = timeArray;
      const timeDate = new Date();
      timeDate.setHours(hours);
      timeDate.setMinutes(minutes);
      timeDate.setSeconds(0); // Default seconds to 0

      // Return formatted time
      return timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
    return 'Invalid Time'; // Handle invalid or missing time
  }

  
  onRowSelect(schedule: any) {
    this.selectedSchedule = schedule;
    this.displayActions = true; // Show the dialog with actions
  }
  deleteSchedule() {
    if (this.selectedSchedule) {
      const scheduleId: number = Number(this.selectedSchedule.id);
      this.scheduleService.deleteSchedule(scheduleId).subscribe(
        response => {
          this.todayScheduleList = this.todayScheduleList.filter(s => s !== this.selectedSchedule);
          this.selectedSchedule = null;
          this.displayActions = false;
        },
        error => {
          console.error('Error deleting schedule:', error);
        }
      );
    }
  }
  
  public getTodayScheduleList(){
    this.scheduleService.getTodaySchedules().subscribe(
      (response) => {
        this.todayScheduleList = response['results'];
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


addMember(): void {
  const ref = this.dialogService.open(MemberFormComponent, {
    header: 'Add Member',
    width: '50%',
    contentStyle: { 'min-height': 'auto', overflow: 'auto' },
    baseZIndex: 10000,
  });

  ref.onClose.subscribe((response: any) => {
    if (response?.status) {
      this.getTodayScheduleList();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response?.message,
      });

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: "Already Exist",
      });
    }
  });
}
addScheduleType(): void {
  const ref = this.dialogService.open(ScheduleTypeFormComponent, {
    header: 'Add Schedule Type',
    width: '50%',
    contentStyle: { 'min-height': 'auto', overflow: 'auto' },
    baseZIndex: 10000,
  });

  ref.onClose.subscribe((response: any) => {
    if (response?.status) {
      this.getTodayScheduleList();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response?.message,
      });

    }
    else if (response?.message && response.message.includes('ConstraintViolationException')) {
      const existMessage = response?.details;
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Already exists', // Custom message for key conflict
      });
     } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: "Cancelled",
      });
    }
  });
}

setSchedule(): void {
  const ref = this.dialogService.open(ScheduleFormComponent, {
    header: 'Set Schedule',
    width: '50%',
    contentStyle: { 'min-height': 'auto', overflow: 'auto' },
    baseZIndex: 10000,
  });

  ref.onClose.subscribe((response: any) => {
    if (response?.status) {
      this.getTodayScheduleList();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registered successfully',
      });

    } 
    else if (response?.message && response.message.includes('Schedule already exists')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Already exists', 
      });
     } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: "Cancelled",
      });
    }
  });
}

setMessage(): void {
  const ref = this.dialogService.open(MessageFormComponent, {
    header: 'Set Message',
    width: '50%',
    contentStyle: { 'min-height': 'auto', overflow: 'auto' },
    baseZIndex: 10000,
  });

  ref.onClose.subscribe((response: any) => {
    if (response?.status) {
      this.getTodayScheduleList();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registered Succefully',
      });
    }
    else if (response?.message && response.message.includes('ConstraintViolationException')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Already exists', 
      });
     } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: "Cancelled",
      });
    }
  });
}

}

