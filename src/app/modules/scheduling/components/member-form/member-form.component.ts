import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent {
  member: Member = new Member(0, '', '');

  constructor(private memberService: MemberService, private ref: DynamicDialogRef, private messageService: MessageService) {}

  addMember(addForm: NgForm): void {
    this.memberService.registerMember(addForm.value).subscribe(
      (response: any) => {
        
        this.messageService.clear();
        this.ref.close(response);
      },
        (error: HttpErrorResponse) => { alert(error.message);
      }
    );
  }
}
