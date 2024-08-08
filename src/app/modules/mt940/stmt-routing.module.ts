import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerList } from './components/customerList/customerList.component';

import { OneTimeStmt } from './components/oneTimeStmt/oneTimeStmt.component';
import { AddCustomer } from './components/addCustomer/addCustomer.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MT940',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'View ',
      },
      {
        path: 'addCustomer',
        component: AddCustomer,
        data: {
          title: 'addCustomer',
        },
      },
      {
        path: 'customerList',
        component: CustomerList,
        data: {
          title: 'customerList',
        },
      },

      {
        path: 'oneTimeStmt',
        component: OneTimeStmt,
        data: {
          title: 'oneTimeStmt'
        }
      },
  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CCRoutingModule { }
