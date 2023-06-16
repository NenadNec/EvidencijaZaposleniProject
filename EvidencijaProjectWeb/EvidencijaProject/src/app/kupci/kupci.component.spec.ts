import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupciComponent } from './kupci.component';

describe('KupciComponent', () => {
  let component: KupciComponent;
  let fixture: ComponentFixture<KupciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KupciComponent]
    });
    fixture = TestBed.createComponent(KupciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
