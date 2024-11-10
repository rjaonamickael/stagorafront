import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantService } from '../../../../services/etudiant.service';
import { CommonModule } from '@angular/common';
import { EtablissementService } from '../../../../services/etablissement.service';

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
    private etablissementService: EtablissementService // Injection du service
  ) {
    this.etudiantInscriptionForm = this.fb.group({
      user: this.fb.group({
        email:['', [Validators.required, Validators.email]],
        mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['']
      }),
      etudiant: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        etablissement:['', Validators.required]
      })
    });

    // Appeler le service pour récupérer les établissements avec ID et nom
    this.etablissementService.getEtablissements().subscribe((data: { id: number, nom: string }[]) => {
      this.etablissements = data; // Assignation des établissements avec ID et nom
      // Si vous avez un établissement par défaut, vous pouvez le définir ici
      if (this.etablissements.length > 0) {
        this.etudiantInscriptionForm.get('etudiant.etablissement')?.patchValue(this.etablissements[0].id); // Exemple : sélectionner le 1er établissement
      }
    });
  }
  // Onsubmit() method
  onSubmit() {
    console.log(this.etudiantInscriptionForm); // Vérifiez ici l'état du formulaire
    if(this.etudiantInscriptionForm.valid) {
      const etudiantData = this.etudiantInscriptionForm.value;
      console.log("Données envoyées : ", etudiantData);
      this.etudiantService.inscrireEtudiant(etudiantData).subscribe(
        (response) => {
          console.log("Inscription réussie : ", response.message);
          alert(response.message);
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
