import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/scheduleService';
import { Schedule } from '../../models/schedule';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'schedule-view',
  templateUrl: 'schedule-view.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ScheduleViewComponent implements OnInit {

  schedules: Schedule[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data: any) => {
      console.log('Received data:', data);
      this.schedules = this.formatSchedules(data);
    });
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
    console.log("Delete All Schedules button clicked");
    this.scheduleService.deleteAllSchedules().subscribe(
      () => {
        this.schedules = [];
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'All schedules have been deleted' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete schedules' });
        console.error('Failed to delete schedules:', error);
      }
    );
  }
  
  
}
