import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviKupacComponent } from './novi-kupac.component';

describe('NoviKupacComponent', () => {
  let component: NoviKupacComponent;
  let fixture: ComponentFixture<NoviKupacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviKupacComponent]
    });
    fixture = TestBed.createComponent(NoviKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
