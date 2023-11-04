import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditUniverseComponent } from './components/Audit-universe/audit-universe/audit-universe.component';
import { AnnualPlanComponent } from './components/Annual-plan/annual-plan/annual-plan.component';
import { AuditObjectComponent } from './components/Audit-objects/audit-object/audit-object.component';
import { AuditableAreaComponent } from './components/Auditable-area/auditable-area/auditable-area.component';
import { CheckListComponent } from './components/Checklist/checklist/checkList.component';
import { AuditScheduleComponent } from './components/Audit-schedule/audit-schedule/audit-schedule.component';
import { AuditStaffComponent } from './components/Audit-staff/audit-staff/audit-staff.component';
import { AuditObjectDetailComponent } from './components/Audit-objects/audit-object-detail/audit-object-detail.component';
import { AuditTypeComponent } from './components/Audit-type/audit-type/audit-type.component';
import { RiskItemComponent } from './components/Risk-item/risk-item/risk-item.component';
import { AuditEngagementComponent } from './components/Audit-engagement/audit-engagement/audit-engagement.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authority',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'authorityTable',
      },
      {
        path: 'audit-object',
        component: AuditObjectComponent,
        data: {
          title: 'Audit Object',
        },
      },
      {
        path: 'audit-object-detail',
        component: AuditObjectDetailComponent,
        data: {
          title: 'Audit Object detail',
        },
      },
      {
        path: 'audit-object-detail/:id',
        component: AuditObjectDetailComponent,
        data: {
          title: 'Audit Object detail',
        },
      },

      {
        path: 'audit-universe',
        component: AuditUniverseComponent,
        data: {
          title: 'Audit Universe',
        },
      },

      {
        path: 'checklist',
        component: CheckListComponent,
        data: {
          title: 'Checklist',
        },
      },

      {
        path: 'auditable-area',
        component: AuditableAreaComponent,
        data: {
          title: 'Auditable Area',
        },
      },

      {
        path: 'annual-plan',
        component: AnnualPlanComponent,
        data: {
          title: 'Annual Plan',
        },
      },

      {
        path: 'audit-schedule',
        component: AuditScheduleComponent,
        data: {
          title: 'Audit Schedule',
        },
      },
      {
        path: 'audit-engagement',
        component: AuditEngagementComponent,
        data: {
          title: 'Audit Engagement',
        },
      },
      {
        path: 'audit-staff',
        component: AuditStaffComponent,
        data: {
          title: 'Audit Staff',
        },
      },
      {
        path: 'audit-type',
        component: AuditTypeComponent,
        data: {
          title: 'Audit Type',
        },
      },
      {
        path: 'risk-item',
        component: RiskItemComponent,
        data: {
          title: 'Risk type',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmsRoutingModule { }
