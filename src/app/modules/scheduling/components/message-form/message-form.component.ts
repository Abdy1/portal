import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleMessageService } from '../../services/scheduleMessage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ScheduleTypeService } from '../../services/schedule-type.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {

  constructor(
    private scheduleMessageService: ScheduleMessageService, 
    private ref: DynamicDialogRef, private messageService: MessageService, 
    private scheduleTypeService: ScheduleTypeService) {}

  scheduleType: any;
  selectedScheduleType: any = [];

  ngOnInit(): void {
    this.loadScheduleTypes()
  }
  loadScheduleTypes() {
    this.scheduleTypeService.getScheduleTypes().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.scheduleType = data;
      } else {
        this.scheduleType = Object.values(data);

      }
    });
  }

  addMessage(addForm: NgForm): void {
    this.scheduleMessageService.registerMessage(addForm.value).subscribe(
      (response: any) => {
        
        this.messageService.clear();
        this.ref.close(response);
      },
        (error: HttpErrorResponse) => { alert(error.message);
      }
    );
  }

}
