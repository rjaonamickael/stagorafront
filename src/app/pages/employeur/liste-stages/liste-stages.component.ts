import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-stages',
  templateUrl: './liste-stages.component.html',
  styleUrls: ['./liste-stages.component.scss']
})
export class ListeStagesComponent implements OnInit {
  stages: any[] = []; // Tableau pour stocker les stages

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerStages();
  }

  // Méthode pour récupérer les stages
  chargerStages(): void {
    const idEmployeur = 1; // ID de l'employeur (à adapter si nécessaire)

    this.http.get(`http://localhost:8082/employeur/${idEmployeur}/stages`)
      .subscribe({
        next: (data: any) => {
          this.stages = data;
          console.log('Stages récupérés :', this.stages);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des stages :', error.message || error);
        },
      });
  }

  // Fonction pour `trackBy` dans `*ngFor`
  trackById(index: number, stage: any): number {
    return stage.id;
  }
}
