// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './pages/admin/admin.module';

// Import the components
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component';
import { EtudiantInscriptionComponent } from './pages/etudiant/etudiant-inscription/etudiant-inscription.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeurInscriptionComponent,
    LoginComponent, // Declare LoginComponent here
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule, // Necessary for routing
    AppRoutingModule,
    AdminModule,
    EtudiantInscriptionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
