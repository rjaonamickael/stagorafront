import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8082/user/inscription';

  constructor(private http: HttpClient) { }

  inscrireEtudiant(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/etudiant`, data);
  }
}
