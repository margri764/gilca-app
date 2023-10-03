import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongActionMessageComponent } from './wrong-action-message.component';

describe('WrongActionMessageComponent', () => {
  let component: WrongActionMessageComponent;
  let fixture: ComponentFixture<WrongActionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongActionMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongActionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
