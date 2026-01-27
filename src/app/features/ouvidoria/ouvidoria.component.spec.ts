import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvidoriaComponent } from './ouvidoria.component';

describe('OuvidoriaComponent', () => {
  let component: OuvidoriaComponent;
  let fixture: ComponentFixture<OuvidoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuvidoriaComponent]
    });
    fixture = TestBed.createComponent(OuvidoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
