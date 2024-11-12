import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Etablissement } from '../models/etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8082/user/inscription';
  private baseUrlEtablissements = 'http://localhost:8082/admin/etablissements';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), cache: 'no-store' };

  constructor(private http: HttpClient) { }

  // Inscrire un étudiant
  inscrireEtudiant(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/etudiant`, payload);
  }

  // Récupérer la liste des établissements
  getEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.baseUrlEtablissements, this.httpOptions).pipe(
      tap(etablissements => {
        console.log('Établissements récupérés:', etablissements);}
      ),
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs HTTP
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer plus tard.'));
  }
}
