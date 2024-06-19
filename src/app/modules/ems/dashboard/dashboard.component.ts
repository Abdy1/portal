import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/sso-services/employee.service';
interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  public allEmployee: number;
  public allBranch: number;

  constructor(
    private employeeService: EmployeeService,

  ) { }


  ngOnInit(): void {
    this.countEmployee();
    this.countBranch();
    if (!localStorage.getItem('isReloaded')) {
      localStorage.setItem('isReloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('isReloaded');
    }
  }

  public countEmployee(): void {
    this.employeeService.countEmployee().subscribe(
      (response: any) => {
        this.allEmployee = response;
      },
      (error) => {
        console.log(error.error)
        // Handle other errors (e.g., network issues)
        let errorMessage = 'An unexpected error occurred.';
        if (error.error ) {
          errorMessage = error.error;
        }

      }
    );
  }
  public countBranch(): void {
    this.employeeService.countBranch().subscribe(
      (response: any) => {
        this.allBranch = response;
      },
      (error) => {
        console.log(error.error)
        // Handle other errors (e.g., network issues)
        let errorMessage = 'An unexpected error occurred.';
        if (error.error ) {
          errorMessage = error.error;
        }

      }
    );
  }

}
