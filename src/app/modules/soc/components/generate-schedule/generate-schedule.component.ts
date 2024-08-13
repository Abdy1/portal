import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ScheduleService } from '../../services/schedule/scheduleService';

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.scss'],
})
export class GenerateScheduleComponent implements OnInit {
  startDate: Date | string;
  days: number;
  msgs: any[] = [];
  loading: boolean = false;

  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true; // Show loading indicator
  
      let formattedStartDate: string;
  
      // Check if startDate is a string or Date object and format accordingly
      if (typeof this.startDate === 'string') {
        const date = new Date(this.startDate);
        // Add one day to the date
        date.setDate(date.getDate() + 1);
        formattedStartDate = date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
      } else if (this.startDate instanceof Date) {
        // Add one day to the date
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + 1);
        formattedStartDate = date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
      } else {
        console.error('Invalid startDate format');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid date format' });
        this.loading = false;
        return;
      }
  
      this.scheduleService.generateSchedule(formattedStartDate, this.days).subscribe({
        next: (response: any) => {
          // Assuming the response contains a detailed message from the backend
          console.log('Success:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message || "Scheduled Successfully" });
          this.loading = false; // Hide loading indicator
          this.autoHideMessages();
        },
        error: (error: any) => {
          console.error('Error:', error);
          // Check if the backend response has a detailed message
          const errorMessage = error.error?.message || error.message || 'An error occurred';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "You have already schedule on these days" });
          this.loading = false; // Hide loading indicator
          this.autoHideMessages();
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all required fields' });
    }
  }
  
  

  private autoHideMessages() {
    setTimeout(() => {
      this.msgs = [];
    }, 4000); // Hide messages after 3 seconds
  }
  
}
