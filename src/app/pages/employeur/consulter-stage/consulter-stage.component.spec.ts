import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterStageComponent } from './consulter-stage.component';

describe('ConsulterStageComponent', () => {
  let component: ConsulterStageComponent;
  let fixture: ComponentFixture<ConsulterStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
