import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Name } from '../../../../models/sanction-models/uk/Name';
import { ResponseDetail } from '../../../../models/sanction-models/uk/ResponseDetail';
import { NameAlias } from '../../../../models/sanction-models/eu/NameAlias';
import { ModalService } from '../../../../services/cc-services/modal.service';
import { SanctionListService } from '../../../../services/cc-services/sanction-list.service';
import { DataModel } from '../../../../models/sanction-models/DataModel';
import { UNSanction } from '../../../../models/sanction-models/UNSaction';
import { PepResponseDetail } from '../../../../models/sanction-models/pep/PepResponseDetail';
import { UnIndividualResponseDetail } from '../../../../models/sanction-models/un/UnIndividualResponse';
import { AdverserResponseDetail } from '../../../../models/sanction-models/adverser/AdverserResponseDetail';
import { NbeBlackList } from '../../../../models/sanction-models/nbeblacklist/NbeBlackList';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import Fuse from 'fuse.js'
import { Uisr } from '../../../../models/sanction-models/Uisr';

// import { Listener } from '../../../services/cc-services/Listener';
import { Client } from '@stomp/stompjs';

import { interval } from 'rxjs';
import { repeat } from 'rxjs/operators';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { StmtIntegrationService } from '../../services/stmt.integration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCustomer } from '../addCustomer/addCustomer.component';
import { OneTimeStmt } from '../oneTimeStmt/oneTimeStmt.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customerList',
  templateUrl: './customerList.component.html',
  styleUrls: ['./customerList.component.scss']
})
export class CustomerList implements OnInit {
  constructor(
    private service: StmtIntegrationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private datePipe: DatePipe,

    private router: Router,) { }
customerList:any;
  ngOnInit(): void {
   this.getCustomerList();
  }

  public getCustomerList(){
    

    this.service.getCustomerList().subscribe(
      (response) => {

        this.customerList = response.result.reverse();
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  addCustomer(): void {
    const ref = this.dialogService.open(AddCustomer, {
      header: 'Add Customer',
      width: '50%',
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((response: any) => {
      if (response?.status) {
        this.getCustomerList();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response?.message,
        });

      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: "Cancelled",
        });
      }
    });
  }

  oneTime(): void {
    const ref = this.dialogService.open(OneTimeStmt, {
      header: 'Generate Bank Statement',
      width: '50%',
      contentStyle: { 'min-height': 'auto', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((response: any) => {
      if (response?.status) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response?.message,
        });

      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: "Cancelled",
        });
      }
    });
  }

  }













