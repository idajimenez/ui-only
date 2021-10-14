import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceProfilePreviewComponent } from './space-profile-preview.component';

describe('SpaceProfilePreviewComponent', () => {
  let component: SpaceProfilePreviewComponent;
  let fixture: ComponentFixture<SpaceProfilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceProfilePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceProfilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
