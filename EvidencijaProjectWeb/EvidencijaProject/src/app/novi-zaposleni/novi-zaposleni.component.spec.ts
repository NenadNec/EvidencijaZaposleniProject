import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviZaposleniComponent } from './novi-zaposleni.component';

describe('NoviZaposleniComponent', () => {
  let component: NoviZaposleniComponent;
  let fixture: ComponentFixture<NoviZaposleniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviZaposleniComponent]
    });
    fixture = TestBed.createComponent(NoviZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
