import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone :true,
  imports: [
    CommonModule
    // autres imports si nécessaire
  ]
  
})

export class AccueilComponent {
  selectedOption: string = ''; // Variable pour stocker l'option sélectionnée

  constructor(private router: Router) {}

  // Méthode pour rediriger vers la page de login
  continue(): void {
    if (this.selectedOption) {
      // Si une option est sélectionnée, redirige vers la page login
      this.router.navigate(['/login']);
    } else {
      alert('Veuillez sélectionner une option.');
    }
  }

  // Méthode pour marquer l'option sélectionnée
  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
