import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {
  private baseUrl = 'http://localhost:8082/user/inscription';

  constructor(private http: HttpClient) { }

  inscrireEmployeur(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employeur`, data);
  }
}
