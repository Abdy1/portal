import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICMSDashboardService } from '../../services/icms-dashboard.service';
import { COBHistoryDTO } from 'src/app/models/cms-models/cob-history';
import { error, log } from 'console';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'bankingOperation',
  templateUrl: './bankingOperation.component.html',
  styleUrls: ['./bankingOperation.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BankingOperationDashboardComponent {
  public allDatas: any;
  public inshuranceDatas:any;
  public fraudDatas: any;
  public extinguisherDatas:any;
  public chequeDatas:any
  private subscription: Subscription;
  

  constructor(private icmsdashboardService: ICMSDashboardService) {}

  ngOnInit() {
  
    this.getBankingOperationDashboardupperthree();
    this.getBankingOperationDashboardinshurance();
    this.getBankingOperationDashboardextinguisher();
    this.getBankingOperationDashboardfraud();
    this.getBankingOperationsDashboardCheque();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBankingOperationDashboardupperthree(){
    this.subscription = this.icmsdashboardService.getBankingOperationDashboardUpperThreeDatas().subscribe(
      (response: any) => {
        this.allDatas = response;
      },
      (error) => {
        console.error('Failed to get dashboard data:', error);
      }
    );
  }
  
  getBankingOperationDashboardinshurance(){
     this.subscription = this.icmsdashboardService.getBankingOperationDashboardInshuranceDatas().subscribe(
      (response:any) =>{
        this.inshuranceDatas = response;
      },
      (error) => {
        console.error('Failed to get Inshurance data:', error);
      }
     )
  }

  getBankingOperationDashboardfraud(){
    this.subscription = this.icmsdashboardService.getBankingOperationDashboardFraudDatas().subscribe(
      (response:any) =>{
        this.fraudDatas = response;
      },
      (error) => {
        console.error('Failed to get Fraud data:', error);
      }
     )
  }

  getBankingOperationDashboardextinguisher(){
    this.subscription = this.icmsdashboardService.getBankingOperationDashboardExtingisherDatas().subscribe(
      (response:any) =>{
        this.extinguisherDatas = response;
      },
      (error) => {
        console.error('Failed to get Fraud data:', error);
      }
     )
  }

   getBankingOperationsDashboardCheque(){
     this.subscription = this.icmsdashboardService.getBankingOperationsDashboardChequeDatas().subscribe(
      (response:any) => {
        this.chequeDatas = response;
      },
      (error) =>{
        console.error('Failed to get Dishonoured Cheque Datas', error);
        
      }
     )

   }
  formatDate(dateString: string): string {
    if (dateString && dateString.length >= 11) {
      const year = dateString.substring(3, 7);
      const month = dateString.substring(7, 9);
      const day = dateString.substring(9, 11);
      const date = new Date(`${year}-${month}-${day}`);

      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;
    } else {
      console.error(`Invalid date string: ${dateString}`);
      return dateString;
    }
  }
}
