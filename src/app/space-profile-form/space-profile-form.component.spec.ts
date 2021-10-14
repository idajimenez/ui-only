import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceProfileFormComponent } from './space-profile-form.component';

describe('SpaceProfileFormComponent', () => {
  let component: SpaceProfileFormComponent;
  let fixture: ComponentFixture<SpaceProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
