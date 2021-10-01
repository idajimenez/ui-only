import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFloorPlanComponent } from './preview-floor-plan.component';

describe('PreviewFloorPlanComponent', () => {
  let component: PreviewFloorPlanComponent;
  let fixture: ComponentFixture<PreviewFloorPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewFloorPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFloorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
