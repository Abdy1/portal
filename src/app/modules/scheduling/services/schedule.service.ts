import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Schedule } from '../models/schedule.model'; 

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'http://10.1.125.58:8004/api2/schedule';

  constructor(private http: HttpClient) { }

  // Register a new schedule
  registerSchedule(schedule: Schedule): Observable<Schedule> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/register`;
    return this.http.post<Schedule>(url, schedule, { headers });
  }

  // Get a specific schedule by ID
  getSchedule(id: number): Observable<Schedule> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/get/${id}`;
    return this.http.get<Schedule>(url, { headers });
  }

  // Update an existing schedule
  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/update`;
    return this.http.put<Schedule>(url, schedule, { headers });
  }

  // Get a list of all schedules
  getSchedules(): Observable<Schedule[]> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/list`;
    return this.http.get<Schedule[]>(url, { headers });
  }

  getTodaySchedules(): Observable<Schedule[]> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/todaySchedules`;
    return this.http.get<Schedule[]>(url, { headers });
  }

  // Delete a schedule by ID
  deleteSchedule(id: number): Observable<Schedule> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<Schedule>(url, { headers });
  }
  
}

