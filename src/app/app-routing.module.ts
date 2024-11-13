import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/admin/home/dashboard/dashboard.component';
import { AdminHomeComponent } from './pages/admin/home/container/admin-home.component';
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component';
import { AjouterStageComponent } from './pages/employeur/ajouter-stage/ajouter-stage.component';
import { ModifierStageComponent } from './pages/employeur/modifier-stage/modifier-stage.component';
import { ListeStagesComponent } from './pages/employeur/liste-stages/liste-stages.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { DetailsStageComponent } from './pages/employeur/details-stage/details-stage.component'; // Importer DetailsStageComponent

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription-employeur', component: EmployeurInscriptionComponent },
  { path: 'ajouter-stage', component: AjouterStageComponent },
  { path: 'modifier-stage/:id', component: ModifierStageComponent },
  { path: 'liste-stages', component: ListeStagesComponent },
  { path: 'details-stage/:id', component: DetailsStageComponent }, // Ajouter la route pour details-stage
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '**', redirectTo: '/accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
