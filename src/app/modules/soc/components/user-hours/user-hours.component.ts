import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ScheduleService } from '../../services/schedule/scheduleService';

interface UserHours {
  userName: string;
  totalHours: number;
}

@Component({
  selector: 'app-user-hours',
  templateUrl: './user-hours.component.html',
  styleUrls: ['./user-hours.component.css'],
  providers: [DatePipe]
})
export class UserHoursComponent {
  startDate: Date;
  endDate: Date;
  loading: boolean = false;
  userHours: UserHours[] = [];

  constructor(private scheduleService: ScheduleService, private datePipe: DatePipe) {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.loading = true;

      // Format the dates before sending them
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

      this.scheduleService.getUserHours(formattedStartDate, formattedEndDate).subscribe({
        next: (response: UserHours[]) => {
          this.loading = false;
          this.userHours = response;
        },
        error: (error) => {
          this.loading = false;
          console.error('Failed to fetch user hours:', error);
        }
      });
    }
  }
}
