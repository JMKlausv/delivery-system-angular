import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViechleListComponent } from './viechle-list.component';

describe('ViechleListComponent', () => {
  let component: ViechleListComponent;
  let fixture: ComponentFixture<ViechleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViechleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViechleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
