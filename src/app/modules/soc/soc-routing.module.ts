import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMessagesComponent } from './components/cost-messages/all-messages.component';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { AnalystViewComponent } from './components/analyst-view/analyst-view.component';
import {GenerateScheduleComponent} from './components/generate-schedule/generate-schedule.component';
import { ShiftViewComponent } from './components/shift-view/shift-view.component';
import { CreateAnalystComponent } from './components/create-analyst/create-analyst.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'SOC',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sms-history',
      },
      {
        path: 'update-schedule',
        component: AllMessagesComponent,
        data: {
          title: 'Cost',
        },
      },
      {
        path: 'view-schedule',
        component: ScheduleViewComponent,
        data: {
          title: 'View-Schedule',
        },
      },
      {
        path: 'generate-schedule',
        component: GenerateScheduleComponent,
        data: {
          title: 'Generate-Schedule',
        },
      },
      {
        path: 'create-analyst',
        component: CreateAnalystComponent,
        data: {
          title: 'Create-analyst',
        },
      },
      
      {
        path: 'view-analyst',
        component: AnalystViewComponent,
        data: {
          title: 'View-Analyst',
        },
      },
      {
        path: 'view-shift',
        component: ShiftViewComponent,
        data: {
          title: 'View-Analyst',
        },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocRoutingModule { }
