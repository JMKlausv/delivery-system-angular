import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedButtonGroupComponent } from './shared-button-group.component';

describe('SharedButtonGroupComponent', () => {
  let component: SharedButtonGroupComponent;
  let fixture: ComponentFixture<SharedButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
