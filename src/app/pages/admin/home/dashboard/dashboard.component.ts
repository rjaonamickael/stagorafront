import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissementService } from '../../../../../services/etablissement.service';
import { Etablissement } from '../../../../../models/etablissement.model';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

interface Activity {
  action: string;
  detail: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  etablissements: Etablissement[] = [];
  activities: Activity[] = [];
  selectedEtablissement: Etablissement = { nomEtablissement: '', ville: '', province: '', lienLogo: '' };
  isFormVisible = false;
  showAllEstablishments = false; // Flag to control "Voir tout" functionality
  private destroy$ = new Subject<void>();

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();

    this.etablissementService.addActivity$
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((activity) => {
        this.logActivity(activity.action, activity.detail);
      });
  }

  loadEtablissements(): void {
    this.etablissementService.etablissements$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (etablissements) => {
          this.etablissements = etablissements;
          console.log("Etablissements loaded in DashboardComponent:", this.etablissements);
        },
        (error) => console.error("Erreur lors du chargement des établissements:", error)
      );
  }

  showFormForNewEtablissement(): void {
    this.selectedEtablissement = { nomEtablissement: '', ville: '', province: '', lienLogo: '' };
    this.isFormVisible = true;
  }

  editEtablissement(etablissement: Etablissement): void {
    this.selectedEtablissement = { ...etablissement };
    this.isFormVisible = true;
  }

  saveEtablissement(): void {
    if (this.selectedEtablissement) {
      if (this.selectedEtablissement.id) {
        this.etablissementService.updateEtablissement(this.selectedEtablissement.id, this.selectedEtablissement).subscribe(
          (updated) => {
            const index = this.etablissements.findIndex(e => e.id === updated.id);
            if (index !== -1) this.etablissements[index] = updated;
            this.logActivity('Mise à jour des informations', updated.nomEtablissement || '');
            this.cancel();
          },
          (error) => console.error("Erreur lors de la modification de l'établissement:", error)
        );
      } else {
        this.etablissementService.addEtablissement(this.selectedEtablissement).subscribe(
          (newEtablissement) => {
            this.etablissements.push(newEtablissement);
            this.logActivity('Nouvel établissement ajouté', newEtablissement.nomEtablissement || '');
            this.cancel();
          },
          (error) => console.error("Erreur lors de l’ajout de l’établissement:", error)
        );
      }
    }
  }

  deleteEtablissement(id: number): void {
    const etablissement = this.etablissements.find(e => e.id === id);
    this.etablissementService.deleteEtablissement(id).subscribe(
      () => {
        this.etablissements = this.etablissements.filter(e => e.id !== id);
        this.logActivity('Établissement supprimé', etablissement?.nomEtablissement || '');
      },
      (error) => console.error("Erreur lors de la suppression de l'établissement:", error)
    );
  }

  cancel(): void {
    this.selectedEtablissement = { nomEtablissement: '', ville: '', province: '', lienLogo: '' };
    this.isFormVisible = false;
  }

  logActivity(action: string, detail: string): void {
    const activityExists = this.activities.some(
      (activity) => activity.action === action && activity.detail === detail && activity.timestamp.toDateString() === new Date().toDateString()
    );

    if (!activityExists) {
      const activity: Activity = { action, detail, timestamp: new Date() };
      this.activities.unshift(activity);
      console.log("Activity logged:", activity);
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) return `il y a ${diffDays} jours`;
    else if (diffDays === 1) return `il y a 1 jour`;
    else return "aujourd'hui";
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/logo.jpg';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleViewAll(): void {
    // Toggle the view between limited and full view
    this.showAllEstablishments = !this.showAllEstablishments;
  }
}
