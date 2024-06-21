// person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://localhost:7256/api/Person';

  constructor(private http: HttpClient) { }

  getPersonList(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const url = `${this.apiUrl}/GetPersonList?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getPersonById(id: number): Observable<any> {
    const url = `${this.apiUrl}/GetPersonById/${id}`;
    return this.http.get<any>(url);
  }

  createPerson(person: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/CreatePerson`, person, { headers });
  }

  updatePerson(id: number, person: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/UpdatePerson/${id}`, person, { headers });
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeletePerson/${id}`);
  }

  searchPersons(criteria: string, value: string): Observable<any> {
    const url = `${this.apiUrl}/SearchPersons?${criteria}=${value}`;
    return this.http.get<any>(url);
  }
}
