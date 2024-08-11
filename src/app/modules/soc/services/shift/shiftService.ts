import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NgForm } from '@angular/forms'
import {Shift} from '../../models/shift';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

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
     this.apiServiceUrl = 'http://localhost:8093/api/shifts';
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
  

  getAllShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiServiceUrl}/all`, this.httpOptions)
      .pipe(
        map((response: any) => response as Shift[])
      );
  }

}

  


