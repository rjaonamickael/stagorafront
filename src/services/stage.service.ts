import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private apiUrl = 'http://localhost:8082/api/stages'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un stage
  addStage(stage: any): Observable<any> {
    return this.http.post(this.apiUrl, stage);
  }

  // Méthode pour récupérer un stage par ID
  getStageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Méthode pour mettre à jour un stage
  updateStage(id: number, stage: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, stage);
  }

  // Méthode pour supprimer un stage
  deleteStage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
