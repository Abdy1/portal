import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private ws: WebSocket;
  private notificationSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket('ws://localhost:8080/ws/notifications');

    this.ws.onmessage = (event) => {
      this.notificationSubject.next(event.data);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(() => this.connect(), 1000);
    };
  }

  getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }

  // REST API call to add notification
  addNotification(notification: string): Observable<any> {
    return this.http.post('/api/notifications/add', notification);
  }
}
