import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CIPMService } from '../../../../services/icms-services/cipm-services/cipm.service';
import { CollateralTypeService } from '../../../../services/icms-services/cipm-services/ct.service';
import { OrganizationalUnitService } from '../../../../services/sso-services/organizational-unit.service';
import { IPCTService } from '../../../../services/icms-services/cipm-services/ipct.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, FilterService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CIPM } from "../../../../models/icms-models/cipm-models/cipm";
import { CollateralType } from '../../../../models/icms-models/cipm-models/collatoral-type';
import { IPCT } from '../../../../models/icms-models/cipm-models/ipct';
// import { Branch } from 'src/app/models/sso-models/branch';
import { Status } from '../../../../models/icms-models/cipm-models/status';
import { StatusService } from '../../../../services/icms-services/cipm-services/status.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'new-cipm',
  templateUrl: './new-cipm.component.html',
  styleUrls: ['./new-cipm.component.scss'],
  providers: [MessageService, ConfirmationService,DatePipe] // Provide DatePipe
})

export class NewCIPMComponent implements OnInit {
  public cipms: CIPM = new CIPM();
  public cipm: CIPM = new CIPM();
  roles: string[] = [];

  // public selectedBranch: Branch;
  public selectedBranch;
  public selectedSubProcess;
  statuses: Status[] = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'Closed' }
  ];
  selectedstatus: Status;
  public collatoralTypes: CollateralType[] = [];
  selectedcollatoralType: CollateralType;
  public IPCTs: IPCT[] = [];
  selectedIPCT: IPCT;
  update: boolean = false;
  msgs: Message[] = [];
  value: string;
  branchId: string = localStorage.getItem('branchId');

  subProcessId: number = Number(localStorage.getItem('subProcessId'));
  authorizedBy: string = "Not Authorized"
  preparedBy: string = localStorage.getItem('name');
  authorizationTimeStamp: string = "Not Authorized"
  isOtherCollateralTypeSelected: boolean = false;
  isOtherIPCTSelected: boolean = false;
  insuranceExpireDate: Date;

  constructor(private datePipe: DatePipe, private filterService: FilterService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private cipmService: CIPMService, private statusService: StatusService, private collatoralTypeService: CollateralTypeService, private organizationalUnitService: OrganizationalUnitService, private ipctService: IPCTService, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    this.getCollatoralTypes();
    this.getIPCTs();
    this.getStatus();
    this.populateRoles();


    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getCIPM(id);
        this.update = true;
      } else {
        this.selectedstatus = this.statuses.find(status => status.name === 'Active');
      }
    });
    this.selectedBranch = JSON.parse(localStorage.getItem("branch"));
    this.selectedSubProcess = JSON.parse(localStorage.getItem("subProcess"))



  }

  onIPCTChange(event: any) {
    this.isOtherIPCTSelected = (event.value.name === 'Other');
  }

  onCollateralTypeChange(event: any) {
    this.isOtherCollateralTypeSelected = (event.value.name === 'Other');
  }


  public getCollatoralTypes(): void {
    this.collatoralTypeService.getCollatoralTypes().subscribe(
      (response: CollateralType[]) => {
        this.collatoralTypes = response;
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  public getIPCTs(): void {
    this.ipctService.getIPCTs().subscribe(
      (response: IPCT[]) => {
        this.IPCTs = response;
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  public getStatus(): void {
    this.statusService.getStatuses().subscribe(
      (response: Status[]) => {
        this.statuses = response;
        // Set the initial selectedActivityStatus to "Open" when adding data
        this.selectedstatus = this.statuses.find(status => status.name === "Active");
      },
      (error: HttpErrorResponse) => {
        // Handle error
      }
    );
  }

  populateRoles(): void {
    let index = 0;
    let cond = localStorage.getItem('role_' + index);
    while (cond) {

      this.roles.push(cond);
      index++;
      cond = localStorage.getItem('role_' + index);
    }
  }

  public populateSelectedStatus(existingStatus: Status): void {
    this.selectedstatus = existingStatus;
  }

  public getCIPM(id: number): CIPM {
    this.cipmService.getCIPM(id).subscribe(
      (response: CIPM) => {
        this.cipm = response;
        this.cipm.insuranceExpireDate = new Date(this.datePipe.transform(this.cipm.insuranceExpireDate, 'MM/dd/yyyy'));
        this.selectedstatus = this.statuses.find(status => status.name === this.cipm?.status?.name);
        this.selectedcollatoralType = this.cipm?.collateralType ;
        this.selectedIPCT = this.cipm?.insuranceCoverageType;
        this.insuranceExpireDate = new Date(this.cipm?.insuranceExpireDate);
      },
      (error: HttpErrorResponse) => {

      }
    );
    return this.cipm;
  }

  public submitCIPM(CIPMForm: NgForm): void {
    if (CIPMForm.valid) {
      const insuranceExpireDate = this.formatDate(this.cipm.insuranceExpireDate);
      const formValueWithDate = {
        ...CIPMForm.value,
        insuranceExpireDate
      };
  
      const otherInsuranceCoverageType = CIPMForm.value.otherInsuranceCoverageType || "";
      
      if (this.update) {
        const updatedValue = {
          ...this.cipm,
          insuranceExpireDate: new Date(insuranceExpireDate),
          status: this.selectedstatus,
          collateralType: this.selectedcollatoralType,
          insuranceCoverageType: this.selectedIPCT,
          otherInsuranceCoverageType
        };
  
        this.cipmService.updateCIPM(updatedValue).subscribe(
          (response: CIPM) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Collateral Insurance Policy Monitoring updated Successfully!"
            });
            setTimeout(() => {
              this.router.navigate(['ICMS/CIPM/viewCIPM']);
            }, 1500);
          },
          (error: HttpErrorResponse) => {
          }
        );
      } else {
        this.cipmService.addCIPM(formValueWithDate).subscribe(
          (response: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Collateral Insurance Policy Monitoring added Successfully!"
            });
            setTimeout(() => {
              this.router.navigate(['ICMS/CIPM/viewCIPM']);
            }, 1500);
          },
          (error: HttpErrorResponse) => {
            
          }
        );
      }
    }
  }
  

  
  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
  
}



