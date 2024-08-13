import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NgForm } from '@angular/forms'
import {Userr} from '../../models/userr';


@Injectable({
  providedIn: 'root'
})
export class AnalystService {

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
     this.apiServiceUrl = 'http://localhost:8093/api/users';
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
  //  getAllUsers(): Observable<Userr[]> {
  //   return this.http.get<Userr[]>(this.apiServiceUrl/all, this.httpOptions);
  // }
  getAllUsers(): Observable<Userr[]> {
    return this.http.get<Userr[]>(`${this.apiServiceUrl}/all`, this.httpOptions)
      .pipe(
        map((response: any) => response as Userr[])
      );
  }
  createUser(user: Userr): Observable<any> {
    return this.http.post<Userr>(this.apiServiceUrl, user, this.httpOptions);
  }
}

  


