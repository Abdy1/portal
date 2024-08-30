import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScheduleTypeFormComponent } from './components/schedule-type-form/schedule-type-form.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { TodaySchedulesComponent } from './components/today-schedules/today-schedules.component';
import { FormsModule } from '@angular/forms';
import { SchedulingRoutingModule } from './schedule-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormModule,
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  CarouselModule,
  CollapseModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AnimateModule } from 'primeng/animate';
import { ViewSchedulesComponent } from './view-schedules/view-schedules.component';


@NgModule({
  declarations: [
    ScheduleTypeFormComponent,
    MemberFormComponent,
    ScheduleFormComponent,
    TodaySchedulesComponent,
    MessageFormComponent,
    ViewSchedulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SchedulingRoutingModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MessageModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    PaginationModule,
    SelectButtonModule,
    PopoverModule,
    AnimateModule,
    FormModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    CarouselModule,
    CollapseModule,
    GridModule,
    ListGroupModule,
    NavModule,
    PlaceholderModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    SpinnerModule,
    TabsModule,
    TooltipModule,
    UtilitiesModule,
  ],

  providers:[DialogService, MessageService, DatePipe]
})
export class SchedulingModule { }

