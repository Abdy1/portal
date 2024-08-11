import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { find, Subscription } from 'rxjs';
import { AuditScheduleService } from 'src/app/modules/ams/services/audit-schedule/audit-schedule.service';
import { AuditProgramService } from 'src/app/modules/ams/services/auidit-program/audit-program.service';
import { AuditFindingService } from 'src/app/modules/ams/services/auidit-finding/audit-finding.service';
import { AuditProgramDTO } from 'src/app/modules/ams/models/audit program';
import { FindingDTO } from '../../../models/finding';
import { AuditableAreasDTO } from '../../../models/auditableAreas';
import { AuditableAreasService } from '../../../services/auditableArea/auditableArea.service';
import { AuditObjectDTO } from '../../../models/auditObject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-audit-findings',
  templateUrl: './new-audit-findings.component.html',
  styleUrls: ['./new-audit-findings.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewAuditFindingsComponent implements OnDestroy {
  public auditableArea: AuditableAreasDTO[] = [];
  public findingInfo: FindingDTO = new FindingDTO();
  private subscriptions: Subscription[] = [];
  public auditProgram: AuditProgramDTO[] = [];
  datePipe: any;
  public isCreate:boolean = true;
  isAreaSelected = false; // Initialize as false
  public isAuditee;
  private roles = JSON.parse(localStorage.getItem("allRoles"));

  public programInfo: AuditProgramDTO = new AuditProgramDTO();
 

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private auditFindingService: AuditFindingService,
    private router: Router,
    private auditableAreaService: AuditableAreasService
  ) { }

  ngOnInit() {
    if (this.config.data?.auditProgram) {
      this.programInfo = this.config.data.auditProgram;
      this.getAuditableAreas(this.config.data.auditProgram.engagementInfo.auditSchedule.annualPlan.auditObject.id);
    }

    if (this.config.data?.auditFinding) {
      this.findingInfo = this.config.data.auditFinding;
      this.isCreate = false;
    }
    this.isAuditee = this.roles.some(obj => obj.name === "ROLE_AMS_AUDITEE");

    
  }
  submit(data : NgForm){
        if(this.config.data?.auditFinding){
          this.updateFinding(data);
        } else if(this.config.data?.auditProgram){
          this.addFinding(data);
        }
  }
  addFinding(addDivForm: NgForm): void {
    const finding: FindingDTO = { ...addDivForm.value, auditProgram: this.programInfo };
    finding.createdUser = localStorage.getItem('id')
    this.subscriptions.push(
      this.auditFindingService.addAuditFinding(finding).subscribe(
        (response: any) => {
          this.ref.close(response);
     
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }

  updateFinding(addDivForm: NgForm): void {
    let finding: FindingDTO = this.findingInfo;
 
    finding.modifiedUser = localStorage.getItem('id');
    finding.justifications = addDivForm.value.justifications;
    console.log(finding);
    this.subscriptions.push(
      this.auditFindingService.updateAuditFinding(finding).subscribe(
        (response: any) => {
          this.router.navigate(['ams/audit-engagement-details']);
          this.ref.close(response);
        
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }


  getAuditableAreas(id?: number): void {
    let auditObject = new AuditObjectDTO();
    auditObject.id = id as number;
    this.subscriptions.push(
      this.auditableAreaService.getAuditableAreasById(auditObject).subscribe(
        (response: any) => {
          this.auditableArea = response.result;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }




  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  closeDialog(): void {
    this.ref.close();
  }
}
