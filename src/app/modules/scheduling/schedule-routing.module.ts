import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleTypeFormComponent } from './components/schedule-type-form/schedule-type-form.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { TodaySchedulesComponent } from './components/today-schedules/today-schedules.component';
import { ViewSchedulesComponent } from './view-schedules/view-schedules.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'scheduling',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'today-schedules',
      },
      {
        path: 'schedule-form',
        component: ScheduleFormComponent,
        data: {
          title: 'Add Schedule',
        },
      },
      {
        path: 'today-schedules',
        component: TodaySchedulesComponent,
        data: {
          title: 'Todays Schedule',
        },
      },
      {
        path: 'view-schedules',
        component: ViewSchedulesComponent,
        data: {
          title: 'View Schedule',
        },
      },
      {
        path: 'member-form',
        component: MemberFormComponent,
        data: {
          title: 'Add Member',
        },
      },
      {
        path: 'schedule-type-form',
        component: ScheduleTypeFormComponent,
        data: {
          title: 'Add Schedule Type',
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingRoutingModule {}
