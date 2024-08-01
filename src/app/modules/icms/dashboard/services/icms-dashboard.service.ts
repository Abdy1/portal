import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ICMSDashboardService {
  private httpOptions: any;
  private apiServiceUrl: any;

  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };
    // this.apiServiceUrl = localStorage.getItem('url_8');
    // this.apiServiceUrl = 'http://localhost:8084';
    this.apiServiceUrl = 'http://10.1.125.58:8084';
  }

  constructor(private http: HttpClient) {}

  public getBranchDashboardDatas(branchId: string): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forBranchIc/${branchId}`,
      this.httpOptions
    );
  }

  public getDistrictDashboardDatas(subProcessId: number): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forDistrictIc/${subProcessId}`,
      this.httpOptions
    );
  }


  public getRCMPDashboardDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/ICMS_ADMIN`,
      this.httpOptions
    );
  }


  public getBranchDashboardDoughnutDatas(branchId: string): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/DACGM/subcategories/count/by-branch/${branchId}`,
      this.httpOptions
    );
  }

  public getDistrictDashboardDoughnutDatas(subProcessId: number): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/DACGM/subcategories/count/by-subprocess/${subProcessId}`,
      this.httpOptions
    );
  }
 
  
  public getIFBDashboardDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forIFB`,
      this.httpOptions
    );
  }
  public getIfbDashboardPieDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forIfbPieChart`,
      this.httpOptions
    );
  }


  public getTradeDashboardDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forTrade`,
      this.httpOptions
    );
  }


  public getTradeDashboardDonutDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forTradeDonut`,
      this.httpOptions
    );
  }


  
  public getFinanceDashboardDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forFinance`,
      this.httpOptions
    );
  }


  public getFinanceDashboardDonutDatas(): Observable<any> {
    this.init();
    return this.http.get<any>(
      `${this.apiServiceUrl}/view/dashboard/forFinanceDonut`,
      this.httpOptions
    );
  }

}


