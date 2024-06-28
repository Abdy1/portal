import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AnnualPlanService } from 'src/app/modules/ams/services/annual-plan/annual-plan.service';
import { AnnualPlanDTO } from 'src/app/modules/ams/models/annualPlan';
import { NewAnnualPlanComponent } from '../new-annual-plan/newAnnualPlan.component';
import { Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';
import { NewAuditScheduleComponent } from '../../Audit-schedule/new-audit-schedule/newAuditSchedule.component';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuditUniverseService } from '../../../services/auidit-universe/audit-universe.service';
import { RiskLevelDTO } from '../../../models/RiskLevel';
import { NewRiskLevel } from '../new-risk-level/newRiskLevel.component';
import { RiskScoreComponent } from '../risk-score/risk-score.component';
import { RistScoreDTO } from '../../../models/RiskScoreDTO';


interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'annual-plan-table',
  templateUrl: './annual-plan.component.html',
  styleUrls: ['./annual-plan.component.scss'],
})
export class AnnualPlanComponent {
  private roles = JSON.parse(localStorage.getItem("allRoles"));
  public annualPlans: AnnualPlanDTO[] = [];
  public risk: AnnualPlanDTO[] = [];

  public annualPlanDisplay: any[] = [];

  public dropdownOptions = this.getYears();
  public selectedDropdown: string;
  riskScoreDialogRef: DynamicDialogRef;

  public annualInfo: AnnualPlanDTO;
  selectedAnnualInfo: AnnualPlanDTO;
  public isDirector:boolean;

  exportColumns!: ExportColumn[];
  cols!: Column[];

  public riskLevel:RiskLevelDTO[] = [];
  riskLevelNonEmpty:boolean;
  savedRiskScores: RistScoreDTO[] = []

  private subscriptions: Subscription[] = [];

  constructor(
    private annualPlanService: AnnualPlanService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef,
    private auditUniverseService:AuditUniverseService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAnnualPlans();
    this.isDirector = this.roles.some(obj => obj.name === "ROLE_AMS_DIRECTOR");
   
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'year', header: 'Year' },
      { field: 'riskScore', header: 'Risk score' },
      { field: 'riskLevel', header: 'Risk Level' },
      { field: 'status', header: 'Status' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    this.getRiskLevel();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  getAnnualPlans(): void {
    this.subscriptions.push(
      this.annualPlanService.getAnnualPlans().subscribe(
        (response: any) => {
          this.annualPlans = response.result;
          console.log(this.annualPlans[0])
          this.annualPlanDisplay = this.annualPlans.map((obj: any) => ({
            ...obj,
            auditObjectName: obj.auditObect
              ? obj.auditObject.name
              : null,
          }));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }

  submitAuditPlanYear(addDivForm: NgForm): void {
    const annualPlan = new AnnualPlanDTO();
    annualPlan.year = addDivForm.value.selectedDropdown;
    this.subscriptions.push(
      this.annualPlanService
        .getAnnualPlansByYear(annualPlan)
        .subscribe(
          (response: any) => {
            if (response.result) {
              this.annualPlans = response.result;
            }
            else {
              this.annualPlans = [];
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    );
  }

  addToAuditSchedule(annualPlan: AnnualPlanDTO): void {
 
 
  
    const ref = this.dialogService.open(NewAuditScheduleComponent, {
      header: 'Create a new audit schedule',
      draggable: true,
      width: '50%',
      data: { annualPlan },
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });
    ref.onClose.subscribe((response: any) => {
      if (response.status) {
        this.getAnnualPlans();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: response.message,
        });
      }
    });
  }

  createNewAnnualPlan(): void {
    const ref = this.dialogService.open(NewAnnualPlanComponent, {
      header: 'Create a new audit plan',
      width: '50%',
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((response: any) => {
      if (response.status) {
        this.getAnnualPlans();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: response.message,
        });
      }
    });
  }

  updateAnnualPlan(id: number): void {
    const annualPlan = this.annualPlans.find((plan) => plan.id === id);
    const ref = this.dialogService.open(NewAnnualPlanComponent, {
      header: 'Update annual plan',
      width: '50%',
      data: { annualPlan },
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });



    ref.onClose.subscribe((response: any) => {
      if (response) {
        this.annualPlans = this.annualPlans.map((plan) =>
          plan.id === response.id ? response : plan
        );
        if (response.status) {
          this.getAnnualPlans();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: response.message,
          });
        }
        this.cd.detectChanges();
      }
    });
  }

  show(annualPlan:AnnualPlanDTO) {
    this.riskScoreDialogRef = this.dialogService.open(RiskScoreComponent, {
      header: 'Risk score',
      width: '60%',
      data: { annualPlanInfo: annualPlan },
    });

    this.riskScoreDialogRef.onClose.subscribe((savedRiskScores) => {
      if (savedRiskScores) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: savedRiskScores.message,
        });
        this.savedRiskScores = savedRiskScores;
        this.getAnnualPlans();
        this.cdref.detectChanges();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: savedRiskScores.message,
        });
      }
    });
  }

  approveAnnualPlan(addDivForm: number): void {


    this.subscriptions.push(
      this.annualPlanService
        .approveAnnualPlan(addDivForm)
        .subscribe(
          (response: any) => {
            this.getAnnualPlans();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    );
  }

  getYears(): string[] {
    const startYear = 2024;
    const endYear = 2050;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => `${startYear + i}/${startYear + i + 1}`);
    return years;
  }
  updateRiskLevel(riskLevel:RiskLevelDTO): void {
    
    const ref = this.dialogService.open(NewRiskLevel, {
      header: 'Create Risk Level',
      draggable: true,
      width: '60%',
      data: { riskLevel },
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((response: any) => {
      if (response.status) {
        this.getRiskLevel();
        this.getAnnualPlans();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: response.message,
        });
      }
    });
  }
  getRiskLevel(): void {
    this.subscriptions.push(
      this.auditUniverseService.getRiskLevel().subscribe(
        (response: any) => {
          this.riskLevel = response.result;   
          console.log(this.riskLevel);
          this.riskLevelNonEmpty = response.status;
          
      

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

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');

        const modifiedAnnualPlanDisplay = this.annualPlanDisplay.map((plan, index) => ({
          ...plan,
          id: index + 1,
        }));

        (doc as any).autoTable(this.exportColumns, modifiedAnnualPlanDisplay);
        doc.save('Annual plan.pdf');
      });
    });
  }



  exportExcel() {
    import('xlsx').then((xlsx) => {
      const data = this.annualPlanDisplay.map((plan, index) => ({
        Id: index + 1,
        Name: plan.name,
        Description: plan.description,
        Year: plan.year,
        'Risk Score': plan.riskScore,
        'Risk Level': plan.riskLevel,
        Status: plan.status
      }));
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const dataBlob = new Blob([excelBuffer], { type: EXCEL_TYPE });
      this.saveAsExcelFile(dataBlob, 'Annual plan');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_EXTENSION = '.xlsx';
    FileSaver.saveAs(
      buffer,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
