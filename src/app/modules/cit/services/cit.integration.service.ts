import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Step} from '../models/Step'
import { CobIssueDTO } from '../models/CobIssueDTO';

@Injectable({
  providedIn: 'root'
})
export class CitIntegrationService {

  private localUrl="http://localhost:8102/cobIssue";
  private localStepUrl="http://localhost:8102/cobSteps";

  private baseUrl="http://10.1.125.58:8102/cobIssue";
  private stepUrl="http://10.1.125.58:8102/cobSteps";
  
  constructor(private http:HttpClient) { }
  public getListCobDTO():Observable<any>{
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.get<any>(`${this.localUrl}/getAll`,{headers});

  }
  public addCobDTO(CobIssueDTO :CobIssueDTO):Observable<CobIssueDTO>{

    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.post<CobIssueDTO>(`${this.baseUrl}/register`,CobIssueDTO, {headers});


  }
 
  public listCopiedSteps():Observable<any>{

    const headers = {'Authorization':'Bearer '+localStorage.getItem('access_token')};
    return this.http.get<any>(`${this.localStepUrl}/getAll`,{headers});


  }

  public copyRecord(step :Step):Observable<any>{
  
    
   return this.http.post<any>(`${this.stepUrl}/recorder`,step);


  }



}
