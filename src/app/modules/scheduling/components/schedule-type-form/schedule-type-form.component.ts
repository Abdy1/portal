import { Component } from '@angular/core';
import { ScheduleType } from '../../models/schedule-type.model';
import { ScheduleTypeService } from '../../services/schedule-type.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-schedule-type-form',
  templateUrl: './schedule-type-form.component.html',
  styleUrls: ['./schedule-type-form.component.scss']
})
export class ScheduleTypeFormComponent {

  constructor(private scheduleTypeService: ScheduleTypeService, private ref: DynamicDialogRef, private messageService: MessageService) { }

  // Register a new schedule type
  addScheduleType(addForm: NgForm): void {
    this.scheduleTypeService.createScheduleType(addForm.value).subscribe(
      (response: any) => {
        
        this.messageService.clear();
        this.ref.close(response);
      },
        (error: HttpErrorResponse) => { alert(error.message);
      }
    );
  }
}

