import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditProgramDTO } from '../../models/audit program';

@Injectable({
  providedIn: 'root',
})
export class AuditProgramService {
  private httpOptions: any;
  private apiServiceUrl: any;
  selectedAuditProgram: AuditProgramDTO;

  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };
    this.apiServiceUrl = 'http://10.1.125.58:8099';
  }

  constructor(private http: HttpClient) {}

  public getAuditPrograms(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/ams/auditProgram/listAll`,
      this.httpOptions
    );
  }




  public addAuditProgram(auditProgram: AuditProgramDTO): Observable<any> {
    this.init();
    return this.http.post(
      `${this.apiServiceUrl}/ams/auditProgram/register`,
      auditProgram,
      this.httpOptions
    );
  }

  // public updateAuditUniverse(auditUniverse: AuditProgramDTO): Observable<any>{
  //   this.init();
  //   return this.http.post(`${this.apiServiceUrl}/ams/auditUniverse/update`, auditUniverse, this.httpOptions)
  // }

  // public approveAuditUniverse(auditUniverse: AuditProgramDTO): Observable<any>{
  //   this.init();
  //   return this.http.post(`${this.apiServiceUrl}/ams/auditUniverse/approve`, auditUniverse, this.httpOptions)
  // }
}