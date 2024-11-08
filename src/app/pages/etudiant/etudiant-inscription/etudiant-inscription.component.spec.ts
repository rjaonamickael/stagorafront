import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantInscriptionComponent } from './etudiant-inscription.component';

describe('EtudiantInscriptionComponent', () => {
  let component: EtudiantInscriptionComponent;
  let fixture: ComponentFixture<EtudiantInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
