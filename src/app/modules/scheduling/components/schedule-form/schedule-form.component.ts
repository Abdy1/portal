import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { MemberService } from '../../services/member.service';
import { ScheduleTypeService } from '../../services/schedule-type.service';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent {
  constructor(
    private scheduleService: ScheduleService,
    private memberService: MemberService,
    private scheduleTypeService: ScheduleTypeService,
    private ref: DynamicDialogRef, 
    private messageService: MessageService) {}


  members: any[] = []; 
  selectedMembers: any[] = [];

  scheduleType: any;
  selectedScheduleType: any = null;

  daysOfWeek: { label: string, value: string }[];
  selectedDay: string;


  ngOnInit(): void {
    this.loadMembers();
    this.loadScheduleTypes();
    this.daysOfWeek = [
      { label: 'MONDAY', value: 'MONDAY' },
      { label: 'TUESDAY', value: 'TUESDAY' },
      { label: 'WEDNESDAY', value: 'WEDNESDAY' },
      { label: 'THURSDAY', value: 'THURSDAY' },
      { label: 'FRIDAY', value: 'FRIDAY' },
      { label: 'SATURDAY', value: 'SATURDAY' },
      { label: 'SUNDAY', value: 'SUNDAY' }
    ];

  }
  loadMembers() {
    this.memberService.getMembers().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.members = data;

      } else {
        this.members = Object.values(data);

      }
    });
  }

  loadScheduleTypes() {
    this.scheduleTypeService.getScheduleTypes().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.scheduleType = data;


      } else {
        this.scheduleType = Object.values(data)
      }
    });

  }

  onScheduleTypeChange(event: any) {
    this.selectedScheduleType = event.value;
  }

  onMembersChange(event: any) {
    this.selectedMembers = event.value;
  }
  
  
  setSchedule(addForm: NgForm): void {
    this.scheduleService.registerSchedule(addForm.value).subscribe(

      (response: any) => {

        this.messageService.clear();
        this.ref.close(response);
      },
        (error: HttpErrorResponse) => { alert(error.message);
      }
    );
  }

}

