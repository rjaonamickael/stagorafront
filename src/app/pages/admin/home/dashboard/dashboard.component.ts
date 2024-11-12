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
  selectedEtablissement: Etablissement = { nom: '', ville: '', province: '', logo: undefined };
  isFormVisible = false;
  showAllEstablishments = false;
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
          console.log("Etablissements loaded:", this.etablissements); // Vérifiez le contenu des établissements
        },
        (error) => console.error("Erreur lors du chargement des établissements:", error)
      );
  }

  showFormForNewEtablissement(): void {
    this.selectedEtablissement = { nom: '', ville: '', province: '', logo: undefined };
    this.isFormVisible = true;
  }

  editEtablissement(etablissement: Etablissement): void {
    this.selectedEtablissement = { ...etablissement };
    this.isFormVisible = true;
  }

  saveEtablissement(): void {
    if (this.selectedEtablissement.id) {
     
      this.etablissementService.updateEtablissement(this.selectedEtablissement.id, this.selectedEtablissement)
        .subscribe(
          (updatedEtablissement) => {
            const index = this.etablissements.findIndex(e => e.id === updatedEtablissement.id);
            if (index !== -1) {
              this.etablissements[index] = updatedEtablissement;
            }
            this.logActivity('Établissement modifié', updatedEtablissement.nom || '');
            this.cancel();
          },
          (error) => console.error("Erreur lors de la mise à jour de l'établissement:", error)
        );
    } else {

      const formData = new FormData();
      formData.append('nom', this.selectedEtablissement.nom);
      formData.append('ville', this.selectedEtablissement.ville);
      formData.append('province', this.selectedEtablissement.province);

      if (this.selectedEtablissement.logo) {
        formData.append('logo', this.selectedEtablissement.logo);
      }

      this.etablissementService.addEtablissement(formData).subscribe(
        (newEtablissement) => {
          this.etablissements.push(newEtablissement);
          this.logActivity('Nouvel établissement ajouté', newEtablissement.nom || '');
          this.cancel();
        },
        (error) => console.error("Erreur lors de l’ajout de l’établissement:", error)
      );
    }
  }

  deleteEtablissement(id: number): void {
    const etablissement = this.etablissements.find(e => e.id === id);
    this.etablissementService.deleteEtablissement(id).subscribe(
      () => {
        this.etablissements = this.etablissements.filter(e => e.id !== id);
        this.logActivity('Établissement supprimé', etablissement?.nom || '');
      },
      (error) => console.error("Erreur lors de la suppression de l'établissement:", error)
    );
  }

  cancel(): void {
    this.selectedEtablissement = { nom: '', ville: '', province: '', logo: undefined };
    this.isFormVisible = false;
  }

  logActivity(action: string, detail: string): void {
    const activity: Activity = { action, detail, timestamp: new Date() };
    this.activities.unshift(activity);
    console.log("Activity logged:", activity);
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) return `il y a ${diffDays} jours`;
    else if (diffDays === 1) return `il y a 1 jour`;
    else return "aujourd'hui";
  }

  getLogoUrl(logoFilename: string | undefined): string {
    if (logoFilename) {
      const fullUrl = `http://localhost:8082/files/images/${logoFilename}`;
      return fullUrl;
    }
    return 'assets/logo.jpg';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleViewAll(): void {
    this.showAllEstablishments = !this.showAllEstablishments;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.selectedEtablissement.logo = file;
    }
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/logo.jpg';
  }
}
