import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierStageComponent } from './modifier-stage.component';

describe('ModifierStageComponent', () => {
  let component: ModifierStageComponent;
  let fixture: ComponentFixture<ModifierStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
