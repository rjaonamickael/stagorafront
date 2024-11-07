import { Component, OnInit } from '@angular/core';
import { EtablissementService } from '../../../../../services/etablissement.service';
import { Etablissement } from '../../../../../models/etablissement.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  etablissements: Etablissement[] = [];
  filteredEtablissements: Etablissement[] = [];
  displayedEtablissements: Etablissement[] = [];
  searchTerm: string = '';
  selectedEtablissement: Etablissement | null = null;

  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  private subscription: Subscription | null = null;

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription?.unsubscribe();
  }

  loadEtablissements(): void {
    this.subscription = this.etablissementService.etablissements$.subscribe(
      (data: Etablissement[]) => {
        this.etablissements = data;
        this.filteredEtablissements = data;
        this.calculateTotalPages();
        this.updateDisplayedEtablissements();
      },
      (error) => console.error('Erreur lors du chargement des établissements:', error)
    );
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredEtablissements.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateDisplayedEtablissements(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEtablissements = this.filteredEtablissements.slice(startIndex, endIndex);
  }

  onSearch(): void {
    this.filteredEtablissements = this.etablissements.filter(etablissement =>
      etablissement.nom ? etablissement.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) : false
    );
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayedEtablissements();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedEtablissements();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEtablissements();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedEtablissements();
  }

  addEtablissement(): void {
    // Initialize a new etablissement for addition
    this.selectedEtablissement = { nom: '', ville: '', province: '', logo: '' };
  }

  editEtablissement(etablissement: Etablissement): void {
    // Clone the selected etablissement to avoid direct mutation
    this.selectedEtablissement = { ...etablissement };
  }

  saveEtablissement(): void {
    if (this.selectedEtablissement) {
      if (this.selectedEtablissement.id) {
        // Update existing etablissement
        this.etablissementService.updateEtablissement(this.selectedEtablissement.id, this.selectedEtablissement).subscribe(
          (updated) => {
            const index = this.etablissements.findIndex(e => e.id === updated.id);
            if (index !== -1) this.etablissements[index] = updated;
            this.refreshEtablissements();
            this.selectedEtablissement = null;
          },
          (error) => console.error('Erreur lors de la modification de l’établissement:', error)
        );
      } else {
        // Add a new etablissement
        this.etablissementService.addEtablissement(this.selectedEtablissement).subscribe(
          (newEtablissement) => {
            this.etablissements.push(newEtablissement);
            this.refreshEtablissements();
            this.selectedEtablissement = null;
          },
          (error) => console.error('Erreur lors de l’ajout de l’établissement:', error)
        );
      }
    }
  }

  deleteEtablissement(id: number): void {
    this.etablissementService.deleteEtablissement(id).subscribe(
      () => {
        this.etablissements = this.etablissements.filter(e => e.id !== id);
        this.refreshEtablissements();
      },
      (error) => console.error('Erreur lors de la suppression de l’établissement:', error)
    );
  }

  private refreshEtablissements(): void {
    // Reapply search and pagination updates
    this.onSearch();
  }
}
