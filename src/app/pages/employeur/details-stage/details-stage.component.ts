import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-stage',
  templateUrl: './details-stage.component.html',
  styleUrls: ['./details-stage.component.scss'],
})
export class DetailsStageComponent implements OnInit {
  stageData: any = {};  // Pour stocker les données du stage

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idEmployeur = 1; // ID de l'employeur
    const idStage = this.route.snapshot.paramMap.get('id');  // Récupérer l'ID du stage depuis l'URL

    if (idStage) {
      this.http
        .get(`http://localhost:8082/employeur/${idEmployeur}/stages/${idStage}`)
        .subscribe({
          next: (data: any) => {
            this.stageData = data;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération du stage :', error);
            alert('Impossible de récupérer les détails du stage.');
          },
        });
    }
  }
}
