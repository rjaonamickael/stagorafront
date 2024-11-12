import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStagesComponent } from './liste-stages.component';

describe('ListeStagesComponent', () => {
  let component: ListeStagesComponent;
  let fixture: ComponentFixture<ListeStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeStagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
