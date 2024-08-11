import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../services/all-messages/customerservice';

@Component({
    selector: 'all-messages',
    templateUrl: 'all-messages.component.html'
})
export class AllMessagesComponent  implements OnInit{
    

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
           
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

       

        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;

            default:
                return null;
        }
    }
}