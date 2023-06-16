import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VremenskaPrognozaComponent } from './vremenska-prognoza.component';

describe('VremenskaPrognozaComponent', () => {
  let component: VremenskaPrognozaComponent;
  let fixture: ComponentFixture<VremenskaPrognozaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VremenskaPrognozaComponent]
    });
    fixture = TestBed.createComponent(VremenskaPrognozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
