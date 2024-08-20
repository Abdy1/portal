import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../sms/models/message';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMessageService {

  private apiUrl = 'http://10.1.125.58:8004/api4/scheduleTypeMessage';

  constructor(private http: HttpClient) { }

  // Register a new message
  registerMessage(message: Message): Observable<Message> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/register`;
    return this.http.post<Message>(url, message, { headers });
  }

  // Get a specific message by ID
  getMessage(id: number): Observable<Message> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Message>(url, { headers });
  }

  // Update an message schedule
  updateMessage(message: Message, id: number): Observable<Message> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<Message>(url, message, { headers });
  }

  // Get a list of all messages
  getMessages(): Observable<Message[]> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/list`;
    return this.http.get<Message[]>(url, { headers });
  }

  // Delete a messages by ID
  deleteMessage(id: number): Observable<void> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}

