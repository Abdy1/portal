import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/sso-services/employee.service';
import { ModuleService } from 'src/app/services/sso-services/module.service';
import { OrganizationalUnitService } from 'src/app/services/sso-services/organizational-unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Module } from 'src/app/models/sso-models/module';
import { RoleService } from 'src/app/services/sso-services/role.service';
import { TimeService } from 'src/app/services/sso-services/time.service';
import { ADUserService } from 'src/app/services/sso-services/ad-user.service';
import Fuse from 'fuse.js'
import { Process } from 'src/app/models/sso-models/process';
import { Employee } from '../../ams/models/employee';
import { UserService } from 'src/app/services/sso-services/user.service';


@Component({
  selector: 'app-accordions',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})

export class AddBranch implements OnInit {
  addBranchForm: FormGroup;

  // public users: User[] = [];
  // public user: User;
  // public roles: Role[] = [];
  // public rolesStr: string[] = [];
  // public modules: Module[] = [];
  // public employeeR: Employee[] = [];
  // public employees: Employee[] = [];
  // update: boolean = false;
  // newDiv: boolean = true;
  // public idY: number;
  msgs: Message[] = [];
  // value: string;
  // selectedModules: Module[];
  // selectedEmployee: any;
  // selectedRole: Role[];
  // selectedState: boolean;
  // project: any = {};
  // isClicked: boolean = false;
  // states: any[] = [
  //   { name: 'Active', value: true },
  //   { name: "Inactive", value: false }
  // ];
  // active: boolean;
  // searchTerm: string;
  // searchedEmployees: any;
  // baseVariable: any;
  // previousTerm: string = "";
  // selectedEmployeeId: number;
  // selectedFullName: string;
  // selectedJobTitle: string;
  // selectedOrganizationalUnit: string;
  // selectedSubProcess: string;
  // selectedProcess: string;
  // selectedWorkCenter: string;
  // selectedPhoneNumber: string;
  // selectedPersonalEmail: string;
  // selectedAdUser: string;
  // fullName: string;
  // selectedCompanyEmail: string;
  // selectedDateOfBirth: string;
  // selectedGender: boolean;
  // username: string;
  // userExists: boolean = false;
  // selectedTab1: boolean = true;
  // selectedTab2: boolean = false;


  // public divisions: any[] = [];
  // public employee: Employee;
  // selectedFiles1?: File;
  // selectedFiles2?: File;
  // selectedDivision: any;
  // gender: string;
  // maxDate: Date;



  // uploadedFiles: any[] = [];
  // myDate = new Date();


  //   allProcess: Process[] = [];
  //   searchedSubProcess: any;
  //   stateOptions: any[] = [{ label: 'Branch', value: 'branch' }, { label: 'Team', value: 'team' }];
  //   prompt: String;
  //   field: String;
  //   searchedOrganizationalUnit: any;
  //   sex: any[] = [
  //     { name: 'Male', key: 'M' },
  //     { name: 'Female', key: 'F' },
  // ];

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.addBranchForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      name: ['',      [Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
      mnemonic: ['',  [Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
      location: ['',  [Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
    });
  }


  public addBranch(): void {
    console.log(this.addBranchForm.value)
    this.employeeService.addBranch(this.addBranchForm.value).subscribe(
      (response: any) => {
        if (response && response.employeeId) {
          // Successful response (Assuming response contains employeeId)
    
  
    
          setTimeout(() => {
            this.router.navigate(['ems/addBranch']);
          }, 1500);
        } else {
          // Handle cases where response.employeeId does not exist (unsuccessful scenario)
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: "Created Successfully"
          });
        }
      },
      (error) => {
        console.log(error);
    
        // Handle other errors (e.g., network issues)
        let errorMessage = 'An unexpected error occurred.';
        if (error.error) {
          errorMessage = error.error;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage
        });
      }
    );
    
  }


}
