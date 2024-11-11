import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/admin/home/dashboard/dashboard.component';
import { AdminHomeComponent } from './pages/admin/home/container/admin-home.component';
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component';
import { AjouterStageComponent } from './pages/employeur/ajouter-stage/ajouter-stage.component';
import { ModifierStageComponent } from './pages/employeur/modifier-stage/modifier-stage.component';
import { ListeStagesComponent } from './pages/employeur/liste-stages/liste-stages.component'; // Importation du composant

const routes: Routes = [
  // Route par défaut : redirection vers la page de connexion
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Routes Employeur
  { path: 'login', component: LoginComponent },
  { path: 'inscription-employeur', component: EmployeurInscriptionComponent },
  { path: 'ajouter-stage', component: AjouterStageComponent },
  { path: 'modifier-stage/:id', component: ModifierStageComponent },
  { path: 'liste-stages', component: ListeStagesComponent }, // Route pour la liste des stages

  // Routes Admin
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-home', component: AdminHomeComponent },

  // Wildcard : redirection des routes non reconnues vers /login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
