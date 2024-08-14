import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/scheduleService';
import { Schedule } from '../../models/schedule';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'schedule-view',
  templateUrl: './schedule-view.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ScheduleViewComponent implements OnInit {
  loading: boolean = false;
  schedules: Schedule[] = [];
  roles: string[] = [];
  isAdmin: boolean = false;
  isThreeShiftSchedule: boolean = false; // Flag to determine if the schedule is three-shift

  constructor(
    private scheduleService: ScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadSchedules();
    this.populateRoles();
    this.isAdmin = this.roles.includes('ROLE_SMS_ADMIN');
  }
  populateRoles(): void {
    let index = 0;
    let cond = localStorage.getItem('role_' + index);
    while (cond) {
      this.roles.push(cond);
      index++;
      cond = localStorage.getItem('role_' + index);
    }
  }
  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data: any) => {
      console.log('Received data:', data);
      // Assuming you have a way to determine the schedule type
      this.isThreeShiftSchedule = this.checkIfThreeShiftSchedule(data); 
      this.schedules = this.formatSchedules(data);
    });
  }

  checkIfThreeShiftSchedule(data: any): boolean {
    // Implement your logic to check if it's a three-shift schedule
    // For example, you might check the structure of `data` or have a separate API endpoint for schedule type
    return true; // Or false based on your condition
  }

  formatSchedules(data: any): any[] {
    return Object.entries(data).map(([date, shifts]) => ({
      date,
      shifts: {
        'Shift 1': shifts['Shift 1'] || [],
        'Shift 2': shifts['Shift 2'] || [],
        'Shift 3': shifts['Shift 3'] || [],
        'Day-Off': shifts['Day-Off'] || [],
        'Regular Job': shifts['Regular Job'] || []
      }
    }));
  }

  deleteAllSchedules() {
    this.loading = true; // Start loading indicator
    console.log("Delete All Schedules button clicked");

    this.scheduleService.deleteAllSchedules().subscribe({
        next: () => {
            this.schedules = [];
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'All schedules have been deleted' });
            this.loading = false; // Stop loading indicator
        },
        error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete schedules' });
            console.error('Failed to delete schedules:', error);
            this.loading = false; // Stop loading indicator
        }
    });
}

}
