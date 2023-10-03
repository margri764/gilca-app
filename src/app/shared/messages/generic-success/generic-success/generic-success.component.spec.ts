import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSuccessComponent } from './generic-success.component';

describe('GenericSuccessComponent', () => {
  let component: GenericSuccessComponent;
  let fixture: ComponentFixture<GenericSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
