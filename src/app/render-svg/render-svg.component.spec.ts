import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderSvgComponent } from './render-svg.component';

describe('RenderSvgComponent', () => {
  let component: RenderSvgComponent;
  let fixture: ComponentFixture<RenderSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
