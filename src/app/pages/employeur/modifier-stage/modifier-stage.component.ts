import { Component } from '@angular/core';

@Component({
  selector: 'app-modifier-stage',
  templateUrl: './modifier-stage.component.html',
  styleUrls: ['./modifier-stage.component.scss'],
})
export class ModifierStageComponent {
  // Données pour le formulaire
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

  // Options pour les champs de sélection
  categories = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites = ['Présentiel', 'Distanciel'];
  niveauxEtudes = ['Bac+2', 'Bac+3', 'Bac+5'];

  constructor() {}

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    console.log('Stage modifié :', this.stageData);
    alert('Stage modifié avec succès !');
  }

  // Méthode pour annuler la modification
  onCancel(): void {
    console.log('Modification annulée');
    alert('Modification annulée');
  }
}
