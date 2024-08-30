
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleTypeService } from '../services/schedule-type.service';
import { MemberService } from '../services/member.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService) { }
todayScheduleList:any;
selectedSchedule: any;
displayActions: boolean = false;


  ngOnInit(): void {
   this.getViewScheduleList();
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
  
  public getViewScheduleList(){
    this.scheduleService.getSchedules().subscribe(
      (response) => {
        this.todayScheduleList = response['results'];
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

