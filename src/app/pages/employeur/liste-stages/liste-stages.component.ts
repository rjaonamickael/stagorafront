
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-stages',
  templateUrl: './liste-stages.component.html',
  styleUrls: ['./liste-stages.component.scss'],
  standalone :true,
  imports: [
    CommonModule
    // autres imports si nécessaire
  ]
})
export class ListeStagesComponent implements OnInit {
  stages: any[] = []; // Tableau pour stocker les données des stages

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.chargerStages();
  }

  chargerStages(): void {
    const idEmployeur = 1; // Remplacez par l'ID de l'employeur réel
    this.http.get(`http://localhost:8082/employeur/${idEmployeur}/stages`)
      .subscribe({
        next: (data: any) => {
          this.stages = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des stages:', error);
        },
      });
  }

  modifierStage(stageId: number): void {
    // Redirige vers la page de modification avec l'ID du stage
    this.router.navigate(['/modifier-stage', stageId]);
  }
}
