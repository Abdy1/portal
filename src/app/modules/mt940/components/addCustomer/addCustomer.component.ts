import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { StmtIntegrationService } from '../../services/stmt.integration.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-addCustomer',
  templateUrl: './addCustomer.component.html',
  styleUrls: ['./addCustomer.component.scss'],
  providers: [MessageService, ConfirmationService],
})

export class AddCustomer {
  constructor(private service: StmtIntegrationService, private ref: DynamicDialogRef, private messageService: MessageService,
  ) { }

  public addCustomer(addForm: NgForm) {

    this.service.addCustomer(addForm.value).subscribe(
      (response: any) => {
        this.messageService.clear();
        this.ref.close(response);

      },
      (error: HttpErrorResponse) => { alert(error.message); }






    );
  }



}
