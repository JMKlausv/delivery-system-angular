import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViechleComponent } from './add-viechle.component';

describe('AddViechleComponent', () => {
  let component: AddViechleComponent;
  let fixture: ComponentFixture<AddViechleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViechleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViechleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
