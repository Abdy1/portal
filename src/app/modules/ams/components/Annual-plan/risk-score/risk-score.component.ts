import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { RistScoreDTO } from 'src/app/modules/ams/models/RiskScoreDTO';
import { AnnualPlanService } from '../../../services/annual-plan/annual-plan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'new-audit-universe',
  templateUrl: './risk-score.component.html',
  styleUrls: ['./risk-score.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class RiskScoreComponent {
  riskScores: RistScoreDTO[];
  savedRiskScores: RistScoreDTO[] = [];
  annualPlanInfo: any;

  newDiv: boolean = true;
  private subscriptions: Subscription[] = [];

  @Output() onSave = new EventEmitter<RistScoreDTO[]>();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public annualPlanService: AnnualPlanService,
    private messageService: MessageService,

  ) {
    this.annualPlanInfo = this.config.data?.annualPlanInfo;
    this.riskScores = this.annualPlanInfo?.riskScores || [];  

  }

  ngOnInit(){
    console.log("performing action on ", this.annualPlanInfo?.auditObject?.name)
    console.log("score detail",this.riskScores)

  }


  
  options: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];
  
  saveRiskScores() {
    this.savedRiskScores = this.riskScores;
    this.subscriptions.push(
      this.annualPlanService
        .updateAnnualPlan(this.annualPlanInfo)
        .subscribe((response: any) => {
          this.messageService.clear();
          this.ref.close(response);
        })
    );
    this.ref.close(this.savedRiskScores);
  }

  
  
}
