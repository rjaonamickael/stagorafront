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
    nombrePostes: 1, // Par défaut à 1
    description: '',
    dateDebut: '',
    dateFin: '',
    typeStage: '',
    modalite: '',
    competences: '',
    niveau: '', // Ajout de "niveau"
    remuneration: 0,
    adresse: '', // Ajout de "adresse"
    autres: '', // Ajout de "autres"
  };

  // Options pour les champs
  categories = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites = ['Présentiel', 'Distanciel'];
  niveauxEtudes = ['Bac+2', 'Bac+3', 'Bac+5', 'Doctorat']; // Ajout de l'option "niveauxEtudes"

  constructor(private http: HttpClient) {}

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    // Validation et nettoyage des données avant envoi
    const cleanedStageData = {
      ...this.stageData,
      intitule: this.stageData.intitule || 'Non spécifié',
      categorie: this.stageData.categorie || 'Non spécifiée',
      nombrePostes: this.stageData.nombrePostes || 1,
      description: this.stageData.description || 'Non spécifiée',
      dateDebut: this.stageData.dateDebut || null,
      dateFin: this.stageData.dateFin || null,
      typeStage: this.stageData.typeStage || 'Non spécifié',
      modalite: this.stageData.modalite || 'Non spécifiée',
      competences: this.stageData.competences || 'Non spécifiées',
      niveau: this.stageData.niveau || 'Non spécifié',
      remuneration: this.stageData.remuneration || 0,
      adresse: this.stageData.adresse || 'Non spécifiée',
      autres: this.stageData.autres || 'Aucune information supplémentaire',
    };

    const idEmployeur = 1; // ID de l'employeur (à adapter si nécessaire)

    this.http.post(`http://localhost:8082/employeur/${idEmployeur}/stages`, cleanedStageData)
      .subscribe({
        next: (response) => {
          console.log('Stage ajouté avec succès :', response);
          alert('Stage ajouté avec succès!');
          this.resetForm(); // Réinitialisation du formulaire après soumission
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du stage :', error);
          alert('Une erreur est survenue lors de l\'ajout du stage.');
        },
      });
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.stageData = {
      intitule: '',
      categorie: '',
      nombrePostes: 1,
      description: '',
      dateDebut: '',
      dateFin: '',
      typeStage: '',
      modalite: '',
      competences: '',
      niveau: '',
      remuneration: 0,
      adresse: '',
      autres: '',
    };
  }

  // Méthode pour annuler
  onCancel(): void {
    alert('Ajout annulé');
    this.resetForm(); // Réinitialisation du formulaire
  }
}
