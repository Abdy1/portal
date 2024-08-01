import { Component } from '@angular/core';
import { unWeeklyIntersection } from 'src/app/models/sanction-models/unWeeklyIntersection';
import { SanctionListService } from 'src/app/services/cc-services/sanction-list.service';
import { Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Deliquent_ } from 'src/app/models/sanction-models/Deliquent_';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeScale } from 'chart.js';
import { NbeBlackList } from 'src/app/models/sanction-models/nbeblacklist/NbeBlackList';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StmtIntegrationService } from '../../services/stmt.integration.service';



@Component({
  selector: 'app-oneTimeStmt',
  templateUrl: './oneTimeStmt.component.html',
  styleUrls: ['./OneTimeStmt.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class OneTimeStmt {

  constructor(private service: StmtIntegrationService, private ref: DynamicDialogRef, private messageService: MessageService,  ) { }


public generate(addForm:NgForm){
  console.log(addForm.value);

  this.service.getStmt(addForm.value).subscribe(
    (response: any) => {
      this.messageService.clear();
      this.ref.close(response);

    },
    (error: HttpErrorResponse) => { alert(error.message); }






  );
}

}


