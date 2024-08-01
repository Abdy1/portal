import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {stmtRequestDTO} from '../models/stmtRequestDTO'
import { addCustomerDTO } from '../models/addCustomerDTO';

@Injectable({
  providedIn: 'root'
})
export class StmtIntegrationService {


  private baseUrl="http://localhost:8003/api/stmt";

  constructor(private http:HttpClient) { }

  public addCustomer(addCustomer :any):Observable<any>{
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    
    return this.http.post<any>(`${this.baseUrl}/register`, addCustomer, { headers });



  }
 
  public getCustomerList():Observable<any>{
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };

    return this.http.get<any>(`${this.baseUrl}/customer/list`, { headers });

  }
  public getStmt(stmtRequestDTO : any ):Observable<any>{
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };

    return this.http.post<any>(`${this.baseUrl}/get`,stmtRequestDTO, { headers });

  }



  



}
