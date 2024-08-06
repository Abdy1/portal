import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { IFBService } from './../../service/IFB-services.service';
import { AuditUniverseDTO } from 'src/app/modules/ams/models/auditUniverse';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'ifb-table',
  templateUrl: './ifb-table.component.html',
  styleUrls: ['./ifb-table.component.scss'],
})
export class IFBTableComponent implements OnDestroy {
  public IFBList: any[] = [];
  public ifbListDisplay: any[] = [];

  public universeInfo: AuditUniverseDTO;
  selectedUniverseInfo: AuditUniverseDTO;

  approved: false;

  exportColumns!: ExportColumn[];
  cols!: Column[];
  roles: string[] = [];


  private subscriptions: Subscription[] = [];

  constructor(
    private ifbService: IFBService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.populateRoles();
    this.getIFBList();
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

  // getIFBList(): void {
  //   this.subscriptions.push(
  //     this.ifbService.getAllIFB().subscribe(
  //       (response: any) => {
  //         console.log("aty", response);
          
  //         this.IFBList = response;   
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log(error);
  //       }
  //     )
  //   );
  // }

  public getIFBList(): void {
    let ifbObservable;

    // Assuming getAllIFB returns an observable
    ifbObservable = this.ifbService.getAllIFB();

    if (ifbObservable) {
        ifbObservable.subscribe(
            (response: any[]) => {
              console.log("rrr", response);
              
                // Assuming response is an array of IFB objects
                this.IFBList = response;
                this.ifbListDisplay = this.IFBList.map(this.formatIFBData.bind(this)); // Assuming you want to assign the formatted data to ifbListDisplay
            },
            (error: HttpErrorResponse) => {
                console.error(error);
            }
        );
    }
}

private formatIFBData(obj: any): any {
    let ifbDate = obj.ifbDate ? new Date(obj.ifbDate) : null;
    let formattedIFBDate = ifbDate ? this.formatDate(ifbDate) : null;

    return {
        accountNumber: obj.accountNumber,
        caseId: obj.caseId,
        'allSubCategory.allcategory.name': obj.allSubCategory && obj.allSubCategory.allcategory ? obj.allSubCategory.allcategory.name : null,
        'allSubCategory.name': obj.allSubCategory ? obj.allSubCategory.name : null,
        irregularity: obj.irregularity,
        'productTypes.name': obj.productTypes ? obj.productTypes.name : null,
        ifbDate: formattedIFBDate,
        amountInvolved: parseFloat(obj.amountInvolved) || 0,
        borrowerName: obj.borrowerName,
        responsiblePerson: obj.responsiblePerson,
        'status.name': obj.status ? obj.status.name : null,
        // Add any additional fields as necessary
    };
}

private formatDate(date: Date): string {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}


  updateIFB(id: number): void {
    this.router.navigate(['ICMS/IFB/updateIFB', id]);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



  exportExcel() {
    import('xlsx').then((xlsx) => {
      const data = this.ifbListDisplay.map((plan, index) => ({
        'IFB Date': plan['ifbDate'],
        'Case ID': plan['caseId'],
        'Account Number': plan?.accountNumber,
        'Borrower Name': plan?.borrowerName,
        'Product Types':plan['productTypes.name'],
        Category: plan['allSubCategory.allcategory.name'],
        'Sub Category': plan['allSubCategory.name'],        
        irregularity: plan?.irregularity,        
        'Amount Involved': plan.amountInvolved !== null ? plan.amountInvolved : null,
        'Responsible Person': plan.responsiblePerson,
        'Status': plan['status.name'],
        // This line will add 'Days left to expire' to the Excel sheet
      }));
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Insurance Policy');
    });
  }
  // -id: number;
  // -ifbDate: Date; 
  // -caseId: string; 
  // -accountNumber: string; 
  // -borrowerName: string; 
  // -productTypes: string; 
  // -otherProductTypes: string; 
  // -authorizedBy: string; 
  // -authorizationTimeStamp: string; 
  // -allCategory: any; 
  // allSubCategory: any; 
  // irregularity: string; 
  // amountInvolved: string; 
  // responsiblePerson: string; 
  // status: any; 


  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('CIPM', fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
 
}
