import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-stage',
  templateUrl: './modifier-stage.component.html',
  styleUrls: ['./modifier-stage.component.scss'],
})
export class ModifierStageComponent implements OnInit {
  // Propriétés des sélecteurs
  categories: string[] = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage: string[] = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites: string[] = ['Présentiel', 'Distanciel'];
  niveauxEtudes: string[] = ['Bac+2', 'Bac+3', 'Bac+5'];

  // Données du formulaire
  stageData = {
    intitule: '',
    categorie: '',
    nombrePostes: 0,
    description: '',
    dateDebut: '',
    dateFin: '',
    typeStage: '',
    modalite: '',
    competences: '',
    niveauEtudes: '',
    remuneration: '',
    lieu: '',
    avantages: '',
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idEmployeur = 1; // ID de l'employeur (à adapter si nécessaire)
    const idStage = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID du stage

    if (idStage) {
      this.http.get(`http://localhost:8082/employeur/${idEmployeur}/stages/${idStage}`)
        .subscribe({
          next: (data: any) => {
            this.stageData = data;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération du stage :', error);
          },
        });
    }
  }

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    const idEmployeur = 1; // ID de l'employeur (à adapter si nécessaire)
    const idStage = this.route.snapshot.paramMap.get('id');

    if (idStage) {
      this.http.put(`http://localhost:8082/employeur/${idEmployeur}/stages/${idStage}`, this.stageData)
        .subscribe({
          next: (response) => {
            console.log('Stage modifié avec succès :', response);
            alert('Stage modifié avec succès!');
          },
          error: (error) => {
            console.error('Erreur lors de la modification du stage :', error);
            alert('Une erreur est survenue lors de la modification du stage.');
          },
        });
    }
  }

  // Méthode pour annuler
  onCancel(): void {
    alert('Modification annulée');
  }
}
