import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissementService } from '../../../../../services/etablissement.service';
import { Etablissement } from '../../../../../models/etablissement.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {
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
    this.subscription?.unsubscribe();
  }

  loadEtablissements(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.selectedEtablissement = { nom: '', ville: '', province: '', logo: undefined };
  }

  editEtablissement(etablissement: Etablissement): void {
    
    this.selectedEtablissement = { ...etablissement };
  }

  saveEtablissement(): void {
    if (this.selectedEtablissement) {
      if (this.selectedEtablissement.id) {

        this.etablissementService.updateEtablissement(this.selectedEtablissement.id, this.selectedEtablissement)
          .subscribe(
            (updatedEtablissement) => {

              this.updateLocalEtablissement(updatedEtablissement);
              this.cancel();
            },
            (error) => console.error("Erreur lors de la mise à jour de l'établissement:", error)
          );
      } else {

        const formData = new FormData();
        formData.append('nom', this.selectedEtablissement.nom || '');
        formData.append('ville', this.selectedEtablissement.ville || '');
        formData.append('province', this.selectedEtablissement.province || '');

        if (this.selectedEtablissement.logo) {
          formData.append('logo', this.selectedEtablissement.logo);
        }

        this.etablissementService.addEtablissement(formData).subscribe(
          (newEtablissement) => {

            this.etablissements.push(newEtablissement);
            this.calculateTotalPages();
            this.updateDisplayedEtablissements();
            this.cancel();
          },
          (error) => console.error("Erreur lors de l’ajout de l’établissement:", error)
        );
      }
    }
  }

  updateLocalEtablissement(updatedEtablissement: Etablissement): void {

    const index = this.etablissements.findIndex(e => e.id === updatedEtablissement.id);

    if (index !== -1) {

      this.etablissements[index] = updatedEtablissement;
    }


    this.filteredEtablissements = [...this.etablissements];
    this.updateDisplayedEtablissements();
  }

  deleteEtablissement(id: number): void {
    this.etablissementService.deleteEtablissement(id).subscribe(
      () => {
        this.etablissements = this.etablissements.filter(e => e.id !== id);
        this.updateDisplayedEtablissements();
      },
      (error) => console.error('Erreur lors de la suppression de l’établissement:', error)
    );
  }

  cancel(): void {
    this.selectedEtablissement = null;
  }
}
