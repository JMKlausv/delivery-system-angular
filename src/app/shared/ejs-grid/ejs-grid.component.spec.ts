import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjsGridComponent } from './ejs-grid.component';

describe('EjsGridComponent', () => {
  let component: EjsGridComponent;
  let fixture: ComponentFixture<EjsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
