import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournit ce service à l'ensemble de l'application
})
export class StageService {
  private apiUrl = 'http://localhost:8082/api/stages'; // URL de l'API pour les stages

  constructor(private http: HttpClient) {}

  /**
   * Ajouter un nouveau stage.
   * @param stage Les données du stage à ajouter.
   * @returns Observable de la réponse de l'API.
   */
  addStage(stage: any): Observable<any> {
    return this.http.post(this.apiUrl, stage);
  }

  /**
   * Récupérer les détails d'un stage par son ID.
   * @param id L'identifiant du stage.
   * @returns Observable contenant les détails du stage.
   */
  getStageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupérer tous les stages (si nécessaire pour une liste ou un tableau de stages).
   * @returns Observable contenant la liste des stages.
   */
  getAllStages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Mettre à jour un stage existant.
   * @param id L'identifiant du stage à mettre à jour.
   * @param stage Les nouvelles données du stage.
   * @returns Observable de la réponse de l'API.
   */
  updateStage(id: number, stage: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, stage);
  }

  /**
   * Supprimer un stage par son ID.
   * @param id L'identifiant du stage à supprimer.
   * @returns Observable de la réponse de l'API.
   */
  deleteStage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
