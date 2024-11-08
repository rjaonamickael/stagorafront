// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/admin/home/dashboard/dashboard.component';
import { AdminHomeComponent } from './pages/admin/home/container/admin-home.component';
import { EmployeurInscriptionComponent} from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { EtudiantInscriptionComponent } from './pages/etudiant/etudiant-inscription/etudiant-inscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  
  { path: 'dashboard', component: DashboardComponent },       // Route vers le Dashboard (Accueil)
  { path: 'admin-home', component: AdminHomeComponent },      // Route vers la gestion des établissements
  { path: 'inscription-employeur', component: EmployeurInscriptionComponent }, // Route vers l'inscription des employeurs
  { path: 'inscription-etudiant', component: EtudiantInscriptionComponent }, // Route vers l'inscription des etudiants
  { path: '**', redirectTo: '/dashboard' }  // Redirection des routes inconnues vers le Dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
