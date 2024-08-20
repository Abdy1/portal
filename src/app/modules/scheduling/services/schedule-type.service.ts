import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ScheduleType } from '../models/schedule-type.model';
import { ResponseDTO } from '../models/response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTypeService {

  private apiUrl = 'http://10.1.125.58:8004/api3/scheduleType';  // Update this with your actual API endpoint

  constructor(private http: HttpClient) {}

  getScheduleTypes(): Observable<ScheduleType[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    const url = `${this.apiUrl}/list`;

    return this.http.get<ResponseDTO<ScheduleType>>(url, { headers }).pipe(
      map(response => response.results)
    );
  }

  // Get a single schedule type by ID
  getScheduleType(id: number): Observable<ScheduleType> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.get<ScheduleType>(`${this.apiUrl}/${id}`, { headers });
  }

  // Create a new schedule type
  createScheduleType(scheduleType: ScheduleType): Observable<ScheduleType> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.post<ScheduleType>(`${this.apiUrl}/register`, scheduleType, { headers });
  }

  // Update an existing schedule type
  updateScheduleType(id: number, scheduleType: ScheduleType): Observable<void> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.put<void>(`${this.apiUrl}/${id}`, scheduleType, { headers });
  }

  // Delete a schedule type
  deleteScheduleType(id: number): Observable<void> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
