// src/app/services/etablissement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Etablissement } from '../models/etablissement.model';

interface Activity {
  action: string;
  detail: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  private baseUrl = 'http://localhost:8082/admin/etablissements';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private etablissementsSubject = new BehaviorSubject<Etablissement[]>([]);
  etablissements$ = this.etablissementsSubject.asObservable();

  private activitySubject = new Subject<Activity>();
  addActivity$ = this.activitySubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEtablissements();
  }

  private loadEtablissements(): void {
    this.http.get<Etablissement[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    ).subscribe(etablissements => {
      this.etablissementsSubject.next(etablissements);
      console.log("Initial etablissements loaded:", etablissements);
    });
  }

  addEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(this.baseUrl, etablissement, this.httpOptions).pipe(
      tap(newEtablissement => {
        const currentEtablissements = this.etablissementsSubject.value;
        this.etablissementsSubject.next([...currentEtablissements, newEtablissement]);
        this.emitActivity('Nouvel établissement ajouté', newEtablissement.nomEtablissement);
      }),
      catchError(this.handleError)
    );
  }

  updateEtablissement(id: number, etablissement: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.baseUrl}/${id}`, etablissement, this.httpOptions).pipe(
      tap(updatedEtablissement => {
        const currentEtablissements = this.etablissementsSubject.value.map(e =>
          e.id === updatedEtablissement.id ? updatedEtablissement : e
        );
        this.etablissementsSubject.next(currentEtablissements);
        this.emitActivity('Mise à jour des informations', updatedEtablissement.nomEtablissement);
      }),
      catchError(this.handleError)
    );
  }

  deleteEtablissement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(() => {
        const currentEtablissements = this.etablissementsSubject.value.filter(e => e.id !== id);
        this.etablissementsSubject.next(currentEtablissements);
        this.emitActivity('Établissement supprimé', `ID ${id}`);
      }),
      catchError(this.handleError)
    );
  }

  private emitActivity(action: string, detail: string): void {
    const activity: Activity = {
      action,
      detail,
      timestamp: new Date()
    };
    this.activitySubject.next(activity);
    console.log("Activity emitted:", activity);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred. Please try again later.'));
  }
}
