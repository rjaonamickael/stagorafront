import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtablissementService } from '../../../../../services/etablissement.service';

@Component({
  selector: 'app-etablissement-form',
  templateUrl: './etablissement-form.component.html',
  styleUrls: ['./etablissement-form.component.css']
})
export class EtablissementFormComponent implements OnInit {
  etablissementForm!: FormGroup; // Utilisation de '!' pour indiquer que cette propriété sera initialisée

  constructor(
    private etablissementService: EtablissementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.etablissementForm = this.fb.group({
      nomEtablissement: ['', Validators.required],
      ville: ['', Validators.required],
      province: ['', Validators.required],
      lienLogo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.etablissementForm.valid) {
      this.etablissementService.addEtablissement(this.etablissementForm.value).subscribe(
        (response: any) => {
          console.log('Établissement ajouté avec succès:', response);
          this.etablissementForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de l’ajout de l’établissement:', error);
        }
      );
    } else {
      console.warn('Le formulaire est invalide');
    }
  }
}
