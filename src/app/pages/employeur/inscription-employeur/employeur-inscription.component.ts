import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeurService } from '../../../../services/employeur.service';

@Component({
  selector: 'app-employeur-inscription',
  templateUrl: './employeur-inscription.component.html',
  styleUrls: ['./employeur-inscription.component.scss']
})
export class EmployeurInscriptionComponent {
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private employeurService: EmployeurService) {
    this.inscriptionForm = this.fb.group({
      user: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['']
      }),
      employeur: this.fb.group({
        nom: ['', Validators.required],
        code: [''],
        sites: this.fb.array([this.createSite()])
      })
    });
  }

  get sites(): FormArray {
    return this.inscriptionForm.get('employeur.sites') as FormArray;
  }

  createSite(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      province: ['', Validators.required]
    });
  }

  addSite() {
    this.sites.push(this.createSite());
  }

  removeSite(index: number) {
    this.sites.removeAt(index);
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const employeurData = this.inscriptionForm.value;
      console.log("Données envoyées : ", employeurData);
      this.employeurService.inscrireEmployeur(employeurData).subscribe(
        (response) => {
          console.log("Inscription réussie:", response.message);
          alert(response.message); // Affiche le message de succès
        },
        (error) => {
          console.error("Erreur lors de l'inscription:", error);
          alert(error.error.error || "Erreur lors de l'inscription."); // Affiche le message d'erreur
        }
      );
    } else {
      alert("Le formulaire n'est pas valide. Veuillez vérifier les champs.");
    }
  }
}
