// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './pages/admin/admin.module';
// src/models/employeur.model.ts
import { Site } from '../models/site.model'; // Ajustez le chemin selon l’emplacement du fichier `site.model.ts`


@NgModule({
  declarations: [
    AppComponent,
    EmployeurInscriptionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule, // Import nécessaire pour le routage
    AppRoutingModule,
    AdminModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
