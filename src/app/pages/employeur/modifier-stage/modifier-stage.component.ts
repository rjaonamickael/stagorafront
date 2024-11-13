import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-stage',
  templateUrl: './modifier-stage.component.html',
  styleUrls: ['./modifier-stage.component.scss'],
})
export class ModifierStageComponent implements OnInit {
  // Options des sélecteurs
  categories: string[] = ['Développement', 'Marketing', 'Design', 'Management'];
  typesStage: string[] = ['Stage de fin d\'études', 'Stage professionnel'];
  modalites: string[] = ['Présentiel', 'Distanciel'];
  niveaux: string[] = ['Bac+2', 'Bac+3', 'Bac+5'];

  // Données du formulaire
  stageData = {
    intitule: '',
    categorie: '',
    nombrePostes: 1, // Nombre minimum par défaut
    description: '',
    dateDebut: '',
    dateFin: '',
    typeStage: '',
    modalite: '',
    competences: '',
    niveau: '', // Correction pour remplacer "niveauEtudes"
    remuneration: '',
    adresse: '', // Remplacement de "lieu" par "adresse"
    autres: '', // Remplacement de "avantages" par "autres"
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router // Ajout du service Router pour la navigation
  ) {}

  ngOnInit(): void {
    const idEmployeur = 1; // ID de l'employeur
    const idStage = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID du stage

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

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    const idEmployeur = 1; // ID de l'employeur
    const idStage = this.route.snapshot.paramMap.get('id');

    // Validation basique des champs obligatoires
    if (!this.stageData.intitule || !this.stageData.categorie || !this.stageData.description) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (idStage) {
      this.http
        .put(`http://localhost:8082/employeur/${idEmployeur}/stages/${idStage}`, this.stageData)
        .subscribe({
          next: (response) => {
            console.log('Stage modifié avec succès :', response);
            alert('Stage modifié avec succès!');
            this.router.navigate(['/stages']); // Redirection vers la liste des stages
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
    // Redirection vers la liste des stages
    this.router.navigate(['/stages']);
  }

  // Méthode pour supprimer un stage
  onDelete(): void {
    const idEmployeur = 1; // ID de l'employeur
    const idStage = this.route.snapshot.paramMap.get('id');

    if (idStage && confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      this.http
        .delete(`http://localhost:8082/employeur/${idEmployeur}/stages/${idStage}`)
        .subscribe({
          next: () => {
            alert('Stage supprimé avec succès!');
            this.router.navigate(['/stages']); // Redirection vers la liste des stages
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du stage :', error);
            alert('Une erreur est survenue lors de la suppression du stage.');
          },
        });
    }
  }
}
