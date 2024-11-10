import { Component } from '@angular/core';

@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.scss'],
})
export class AjouterStageComponent {
  // Définir toutes les propriétés utilisées dans le fichier HTML
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

  // Liste des catégories et options pour les sélecteurs
  categories = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites = ['Présentiel', 'Distanciel'];
  niveauxEtudes = ['Bac+2', 'Bac+3', 'Bac+5'];

  constructor() {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    console.log('Stage soumis :', this.stageData);
    alert('Stage ajouté ou modifié avec succès!');
  }

  // Méthode pour annuler l’action
  onCancel(): void {
    console.log('Action annulée');
    alert('Action annulée');
  }
}
