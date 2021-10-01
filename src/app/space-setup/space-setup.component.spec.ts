import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSetupComponent } from './space-setup.component';

describe('SpaceSetupComponent', () => {
  let component: SpaceSetupComponent;
  let fixture: ComponentFixture<SpaceSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
