import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViechleDetailComponent } from './viechle-detail.component';

describe('ViechleDetailComponent', () => {
  let component: ViechleDetailComponent;
  let fixture: ComponentFixture<ViechleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViechleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViechleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
