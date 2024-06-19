import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Employee } from 'src/app/models/sso-models/employee';

@Injectable({
  providedIn: 'root'
})
export class EMSService {
  private httpOptions;
  private httpOptions2;
  private apiServiceUrl;
  private supervisorId = 10001434;

  
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.httpOptions2 = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.apiServiceUrl = localStorage.getItem('url_2');
    // this.apiServiceUrl = "http://localhost:8082";
  }
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    this.init();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiServiceUrl}/EMS/uploadEmployeeData`, formData, this.httpOptions);
  }
  addEmployee(employee:any): Observable<any> {
    this.init()
    return this.http.post<any>(`${this.apiServiceUrl}/ems/api/addEmployee/addEmployee`,employee,this.httpOptions)
  }

  getEmployeeById(id: number): Observable<any> {
    this.init();
    return this.http.get<Employee>(`${this.apiServiceUrl}/ems/api/getEmployeeById/${id}`, this.httpOptions2)
  }
  getEmployeeByIdWithAccess(id: number,token:any): Observable<any> {
    this.init();
     let credential = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log(token)
    return this.http.get<Employee>(`${this.apiServiceUrl}/ems/api/getEmployeeById/${id}`, credential)
  }

  getDirectorBySubProcessId(id: number): Observable<any> {
    this.init();
    return this.http.get<Employee>(`${this.apiServiceUrl}/ems/api/getDirectorBySubProcess/${id}`, this.httpOptions2)

  }
  getEmployeeByIdForStaff(id: string): Observable<any> {
    this.init();
    return this.http.get<Employee>(`${this.apiServiceUrl}/ems/api/getEmployeeById/${id}`, this.httpOptions2)

  }
  public getEmployeeByFullNameFromDB(fullname: string): Observable<any>{
    this.init();
    // return this.http.get<any>(`http://localhost:8082/ems/api/getEmployeeByName/${fullname}`, this.httpOptions2)
    return this.http.get<any>(`${this.apiServiceUrl}/ems/api/getEmployeeByName/${fullname}`, this.httpOptions2)

  }



  getEmployeesOfVicePresidents(): Observable<any> {
    const url = `${this.apiServiceUrl}/ems/api/vice-presidents/${this.supervisorId}`;
    return this.http.get<any>(url);
  }
  
  getEmployeesOfHoDirectors(): Observable<any> {
    const url = `${this.apiServiceUrl}/ems/api/ho_directors/${this.supervisorId}`;
    return this.http.get<any>(url);
  }
  
  getEmployeesOfDistrictDirectors(): Observable<any> {
    const url = `${this.apiServiceUrl}/ems/api/district_directors/${this.supervisorId}`;
    return this.http.get<any>(url);
  }
  
  getEmployeesOfHoManagers(): Observable<any> {
    const url = `${this.apiServiceUrl}/ems/api/ho-managers/${this.supervisorId}`;
    return this.http.get<any>(url);
  }
  
  getEmployeesOfBranchManagers(): Observable<any> {
    const url = `${this.apiServiceUrl}/ems/api/branch-managers/${this.supervisorId}`;
    return this.http.get<any>(url);
  }
}
