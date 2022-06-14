import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedButtonAddComponent } from './shared-button-add.component';

describe('SharedButtonAddComponent', () => {
  let component: SharedButtonAddComponent;
  let fixture: ComponentFixture<SharedButtonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedButtonAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedButtonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
