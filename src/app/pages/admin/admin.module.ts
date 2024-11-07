// src/app/pages/admin/admin.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminHomeComponent } from './home/container/admin-home.component';
import { EtablissementFormComponent } from './home/etablissement-form/etablissement-form.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HeaderComponent } from '../../components/header/header.component'; // Assurez-vous du chemin correct

@NgModule({
  declarations: [
    AdminHomeComponent,
    EtablissementFormComponent,
    DashboardComponent,
    HeaderComponent // Déclarez le HeaderComponent ici
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule // Nécessaire pour le routage dans les composants
  ],
  exports: [
    AdminHomeComponent,
    EtablissementFormComponent,
    HeaderComponent // Exportez HeaderComponent pour l'utiliser dans d'autres modules si nécessaire
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
