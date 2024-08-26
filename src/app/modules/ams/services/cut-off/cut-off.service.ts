import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CutOffDTO } from 'src/app/modules/ams/models/cut-off';

@Injectable({
  providedIn: 'root',
})
export class CutoffService {
  private httpOptions: any;
  private apiServiceUrl: string;

  constructor(private http: HttpClient) {
    this.apiServiceUrl = localStorage.getItem('ams_ip') || ''; // Ensure this is set properly
    this.init();
  }

  private init() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };
  }
  
  addCutoff(cutoffValue: number): Observable<any> {
    console.log('Sending request with headers:', this.httpOptions.headers);
    return this.http.post<any>(`${this.apiServiceUrl}/ams/cutOff/register`,
      { value: cutoffValue }, this.httpOptions);
  }

  public getcutoff(): Observable<any> {
    //this.init();
    return this.http.get<any>
    (`${this.apiServiceUrl}/ams/cutoff/get`,
       this.httpOptions);
  }


}
