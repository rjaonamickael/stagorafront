import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etablissement-list',
  templateUrl: './etablissement-list.component.html',
})
export class EtablissementListComponent implements OnInit {
  etablissements = [
    { nom: 'Cégep de Montréal', logoUrl: 'assets/logo-cegep-montreal.png' },
    { nom: 'Université de Laval', logoUrl: 'assets/logo-universite-laval.png' }
  ]; // Exemple avec URL de logo

  constructor() {}

  ngOnInit(): void {
    // Chargez les données réelles ici, par exemple depuis un service
  }
}
