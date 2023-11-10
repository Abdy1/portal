import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AnnualPlanDTO } from 'src/app/modules/ams/models/annualPlan';
import { Subscription } from 'rxjs';
import { AutoGenerateAnnualPlanDTO } from 'src/app/modules/ams/models/autoGenerateAnnualPlan';
import { NgForm } from '@angular/forms';
import { AnnualPlanService } from 'src/app/modules/ams/services/annual-plan/annual-plan.service';


@Component({
  selector: 'new-audit-universe',
  templateUrl: './auto-generate-annualPlan.component.html',
  styleUrls: ['./auto-generate-annualPlan.component.scss'],
})
export class AutoGenerateAnnualPlanComponent {
  private subscriptions: Subscription[] = [];
  public autoGeneratedAnnualplan: AnnualPlanDTO[] = [];
  newDiv: boolean = true;
  update: boolean = false;
  years: string[] = [];
  public autoGenerateAnnualPlan: AutoGenerateAnnualPlanDTO = new AutoGenerateAnnualPlanDTO();

  constructor(
    public ref: DynamicDialogRef,
    private annualPlanService: AnnualPlanService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.generateYears();
  }

  generateAnnualPlan(autoGenerateAnnualPlanForm: NgForm) {
    const annualPlan: AutoGenerateAnnualPlanDTO = autoGenerateAnnualPlanForm.value;
    this.subscriptions.push(
      this.annualPlanService.generateAnnualPlan(annualPlan).subscribe(
        (response: any) => {
          this.ref?.close(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
  

  generateYears() {
    for (let i = 2024; i <= 2050; i++) {
      this.years.push(`${i}/${i + 1}`);
    }
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
