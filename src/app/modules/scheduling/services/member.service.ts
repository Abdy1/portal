import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Member } from '../models/member.model'; 
import { ResponseDTO } from '../models/response-dto.model'; // Assuming you have a Member interface

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://10.1.125.58:8004/api1/member';  // Base URL for the API

  constructor(private http: HttpClient) { }

  // Register a new member
  registerMember(member: Member): Observable<Member> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/register`;
    return this.http.post<Member>(url, member, { headers });
  }

  // Get a specific member by ID
  getMember(id: number): Observable<Member> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/get/${id}`;
    return this.http.get<Member>(url, { headers });
  }

  // Update an existing member
  updateMember(member: Member): Observable<Member> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/update`;
    return this.http.put<Member>(url, member, { headers });
  }

  getMembers(): Observable<Member[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    const url = `${this.apiUrl}/list`;

    return this.http.get<ResponseDTO<Member>>(url, { headers }).pipe(
      map(response => response.results)
    );
  }


  // Delete a member by ID
  deleteMember(id: number): Observable<void> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('access_token') };
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}

