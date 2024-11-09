// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/admin/home/dashboard/dashboard.component';
import { AdminHomeComponent } from './pages/admin/home/container/admin-home.component';
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component'; // Import the LoginComponent

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },            // Route for Login
  { path: 'dashboard', component: DashboardComponent },    // Route for Dashboard
  { path: 'admin-home', component: AdminHomeComponent },   // Route for Admin Home
  { path: 'inscription-employeur', component: EmployeurInscriptionComponent }, // Route for Employer Registration
  { path: '**', redirectTo: '/login' }                     // Redirect unknown routes to Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
