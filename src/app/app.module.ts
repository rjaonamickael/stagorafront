import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './pages/admin/admin.module';

// Import des composants
import { EmployeurInscriptionComponent } from './pages/employeur/inscription-employeur/employeur-inscription.component';
import { LoginComponent } from './pages/employeur/login/login.component';
import { AjouterStageComponent } from './pages/employeur/ajouter-stage/ajouter-stage.component';
import { ModifierStageComponent } from './pages/employeur/modifier-stage/modifier-stage.component';

// Import du service StageService
import { StageService } from 'src/services/stage.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeurInscriptionComponent,
    LoginComponent,
    AjouterStageComponent,
    ModifierStageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AdminModule,
  ],
  providers: [StageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
