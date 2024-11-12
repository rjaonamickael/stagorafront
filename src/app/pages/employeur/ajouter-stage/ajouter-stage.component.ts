import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.scss'],
})
export class AjouterStageComponent {
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

  // Options pour les champs
  categories = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites = ['Présentiel', 'Distanciel'];
  niveauxEtudes = ['Bac+2', 'Bac+3', 'Bac+5'];

  constructor(private http: HttpClient) {}

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    const idEmployeur = 1; // ID de l'employeur (à adapter si nécessaire)

    this.http.post(`http://localhost:8082/employeur/${idEmployeur}/stages`, this.stageData)
      .subscribe({
        next: (response) => {
          console.log('Stage ajouté avec succès :', response);
          alert('Stage ajouté avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du stage :', error);
          alert('Une erreur est survenue lors de l\'ajout du stage.');
        },
      });
  }

  // Méthode pour annuler
  onCancel(): void {
    alert('Ajout annulé');
  }
}
