import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenasComponent } from './cadenas.component';

describe('CadenasComponent', () => {
  let component: CadenasComponent;
  let fixture: ComponentFixture<CadenasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadenasComponent]
    });
    fixture = TestBed.createComponent(CadenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
