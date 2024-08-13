import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NgForm } from '@angular/forms'
import {Schedule} from '../../models/schedule';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private httpOptions;
  private apiServiceUrl;
  private httpOpForm;
   baseUrl: any;
  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.httpOpForm = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    // this.apiServiceUrl = localStorage.getItem('url_4');
     this.apiServiceUrl = 'http://localhost:8093/api/schedules';
    //  this.apiServiceUrl = 'http://10.1.11.145:8092/api/v1';

  }

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
    this.init();
   }

   getSchedules(): Observable<Map<string, any>> {
    return this.http.get<Map<string, any>>(`${this.apiServiceUrl}/formatted`, {
      headers: this.httpOptions.headers
    });
  }
  deleteAllSchedules() {
    return this.http.delete(`${this.apiServiceUrl}/deleteAll`, {
      headers: this.httpOptions.headers
    });
  }
  
  // generateSchedule(startDate: string, days: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('startDate', startDate)
  //     .set('days', days.toString());

  //   return this.http.post<any>(`${this.apiServiceUrl}/generate`, null, {
  //     ...this.httpOptions,
  //     params,
  //     responseType: 'text' as 'json' 
  //   });
  // }
  
  generateSchedule(startDate: string, days: number, isThreeShiftScenario: boolean): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('days', days.toString())
      .set('isThreeShiftScenario', isThreeShiftScenario.toString()); // Convert boolean to string
  
    return this.http.post<any>(`${this.apiServiceUrl}/generate`, null, {
      ...this.httpOptions,
      params,
      responseType: 'text' as 'json'
    });
  }
  
  
  
  

}
