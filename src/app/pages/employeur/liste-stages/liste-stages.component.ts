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
  ]
})
export class ListeStagesComponent implements OnInit {
  stages: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.chargerStages();
  }

  chargerStages(): void {
    const idEmployeur = 1; // Remplacer par l'ID de l'employeur réel
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
    this.router.navigate(['/modifier-stage', stageId]);
  }

  afficherDetails(stageId: number): void {
    this.router.navigate(['/details-stage', stageId]);  // Naviguer vers la page de détails du stage
  }
}
