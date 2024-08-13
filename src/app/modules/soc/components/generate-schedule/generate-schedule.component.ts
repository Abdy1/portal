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
  formatDate(date: Date | string): string {
    let dateToFormat: Date;
  
    if (typeof date === 'string') {
      dateToFormat = new Date(date);
    } else if (date instanceof Date) {
      dateToFormat = date;
    } else {
      return ''; // Handle unexpected date types
    }
  
    // Add one day
    dateToFormat.setDate(dateToFormat.getDate() + 1);
  
    // Return formatted date as yyyy-MM-dd
    return dateToFormat.toISOString().split('T')[0];
  }
  ;
  shiftTypes = [
    { label: 'Two Shift', value: 'TWO_SHIFT' },
    { label: 'Three Shift', value: 'THREE_SHIFT' }
  ];
 
  shiftType: any;

  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    if (form.valid) {
        this.loading = true;

        const formattedStartDate = this.formatDate(this.startDate);
        const isThreeShiftScenario = this.shiftType?.value === 'THREE_SHIFT';

        this.scheduleService.generateSchedule(formattedStartDate, this.days, isThreeShiftScenario).subscribe({
            next: (response: any) => {
                console.log('Response:', response); // Debugging line

                if (response.status === 'success') {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
                } else {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Schedule generated successfully!" });
                }
                this.loading = false;
            },
            error: (error: any) => {
                console.log('Error:', error); // Debugging line

                const errorMessage = error.error?.message || "Already scheduled on the these days";
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
                this.loading = false;
            }
        });
    } else {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out all required fields.' });
    }
}




  
  
  
  

  private autoHideMessages() {
    setTimeout(() => {
      this.msgs = [];
    }, 4000); // Hide messages after 3 seconds
  }
  
}
