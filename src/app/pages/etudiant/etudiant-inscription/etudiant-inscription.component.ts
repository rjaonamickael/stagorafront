import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantService } from '../../../../services/etudiant.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etudiant-inscription.component.html',
  styleUrls: ['./etudiant-inscription.component.scss']
})
export class EtudiantInscriptionComponent {
  // Attributes
  etudiantInscriptionForm: FormGroup;
  etablissements: { id: number, nom: string }[] = []; // Liste des établissements avec ID et nom
  
  // Constructor
  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private router: Router

  ) {
      this.etudiantInscriptionForm = this.fb.group({
        user: this.fb.group({
          email:['', [Validators.required, Validators.email]],
          mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
          phone: ['', [Validators.pattern(/^\d{10}$/)]]
        }),
        etudiant: this.fb.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          etablissement:[null, Validators.required]
        })
      });
  }

  // appel de loadEtablissements() pour charger les données au moment du chargement du composant
  ngOnInit(): void {
    this.loadEtablissements();
  }

  //Methode pour charger les établissements
  loadEtablissements(): void {
    this.etudiantService.getEtablissements().subscribe(
      (etablissements) => {
        // Filtrer et garantir que `id` est défini et est un nombre
        this.etablissements = etablissements
          .filter((etablissement) => typeof etablissement.id === 'number') // Filtre les éléments avec `id` défini
          .map((etablissement) => ({
            id: etablissement.id ?? 0, // Garantir que `id` est un nombre, sinon utiliser 0
            nom: etablissement.nom
          }));
      },
      (error) => {
        console.error("Erreur lors de la récupération des établissements:", error);
        alert("Erreur lors de la récupération des établissements.");
      }
    );
  }

  // Onsubmit() method
  onSubmit() {
    console.log(this.etudiantInscriptionForm); // Vérifiez ici l'état du formulaire
    if(this.etudiantInscriptionForm.valid) {
      const etudiantData = this.etudiantInscriptionForm.value;
      console.log("Données envoyées : ", etudiantData);

      const etablissementId = etudiantData.etudiant.etablissement;
      console.log("ID de l'établissement : ", etablissementId);
      // Préparation des données à envoyer
      const payload = {
        user: {
          email: etudiantData.user.email,
          mot_de_passe: etudiantData.user.mot_de_passe,
          phone: etudiantData.user.phone 
        },
        etudiant: {
          nom: etudiantData.etudiant.nom,
          prenom: etudiantData.etudiant.prenom,
        },
        id_etablissement: etudiantData.etudiant.etablissement  // on s'assure que l'ID est bien inclus
      };

      // Appel au service pour l'inscription
      this.etudiantService.inscrireEtudiant(payload).subscribe(
        (response) => {
          console.log("Inscription réussie : ", response.message);
          alert(response.message);
          this.router.navigate(['/login-etudiant']);
        },
        (error) => {
          console.error("Erreur lors de l'inscription de l'étudiant: ", error);
          const errorMessage = error.message || "Erreur lors de l'inscription.";
          alert(errorMessage);
        }
      );
    }else {
      this.etudiantInscriptionForm.markAllAsTouched(); // Marquer tous les champs comme touchés
      alert("Le formulaire n'est pas valide. Veuillez vérifier les champs.");
    }
  }
}
