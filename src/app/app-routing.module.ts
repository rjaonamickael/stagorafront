// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/admin/home/dashboard/dashboard.component';
import { AdminHomeComponent } from './pages/admin/home/container/admin-home.component';
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { EtudiantInscriptionComponent } from './pages/etudiant/etudiant-inscription/etudiant-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component'; // Import the LoginComponent
import { LoginEtudiantComponent } from './pages/etudiant/login-etudiant/login-etudiant.component';
import { EtudiantHomeComponent } from './pages/etudiant/etudiant-home/etudiant-home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },            // Route for Login
  { path: 'dashboard', component: DashboardComponent },    // Route for Dashboard
  { path: 'admin-home', component: AdminHomeComponent },   // Route for Admin Home
  { path: 'inscription-employeur', component: EmployeurInscriptionComponent }, // Route for Employer Registration
  { path: 'inscription-etudiant', component: EtudiantInscriptionComponent }, // Route vers l'inscription des etudiants
  { path: 'login-etudiant', component: LoginEtudiantComponent },
  { path: 'etudiant-home', component: EtudiantHomeComponent },
  { path: 'accueil', component: AccueilComponent},
  { path: '**', redirectTo: '/login' },   // Redirect unknown routes to Login
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
