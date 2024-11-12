import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), cache: 'no-store' };

  private etablissementsSubject = new BehaviorSubject<Etablissement[]>([]);
  etablissements$ = this.etablissementsSubject.asObservable();

  private activitySubject = new Subject<Activity>();
  addActivity$ = this.activitySubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEtablissements();
  }

  // Load all etablissements on service initialization
  private loadEtablissements(): void {
    this.http.get<Etablissement[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    ).subscribe(etablissements => {
      this.etablissementsSubject.next(etablissements);
      console.log("Initial etablissements loaded:", etablissements);
    });
  }

  // Validate etablissement fields
  private isEtablissementValid(etablissement: Etablissement): boolean {
    return !!(etablissement.nom && etablissement.ville && etablissement.province);
  }

  // Add a new etablissement
  addEtablissement(formData: FormData): Observable<Etablissement> {
    return this.http.post<Etablissement>(this.baseUrl, formData).pipe(
      tap(newEtablissement => {
        // Évitez d'ajouter localement ici, laissez le composant gérer le rechargement de la liste
        this.emitActivity('Nouvel établissement ajouté', newEtablissement.nom);
      }),
      catchError(this.handleError)
    );
  }


  updateEtablissement(id: number, etablissement: Etablissement): Observable<Etablissement> {
    const formData = new FormData();
    formData.append('nom', etablissement.nom);
    formData.append('ville', etablissement.ville);
    formData.append('province', etablissement.province);

    if (etablissement.logo instanceof File) {
      formData.append('logo', etablissement.logo, etablissement.logo.name);
    }

    return this.http.put<Etablissement>(`${this.baseUrl}/${id}`, formData).pipe(
      tap(updatedEtablissement => {
        console.log("Établissement mis à jour :", updatedEtablissement);
      }),
      catchError(this.handleError)
    );
  }


  // Delete an etablissement by id
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

  // Emit an activity log
  private emitActivity(action: string, detail: string): void {
    const activity: Activity = {
      action,
      detail,
      timestamp: new Date()
    };
    this.activitySubject.next(activity);
    console.log("Activity emitted:", activity);
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred. Please try again later.'));
  }

  // Method to retrieve établissements from the server
  getEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.baseUrl, this.httpOptions).pipe(
      tap(etablissements => console.log('Établissements récupérés:', etablissements)),
      catchError(this.handleError)
    );
  }
  
}
