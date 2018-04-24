import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { radioPlayerComponent } from './radioPlayer.component';

describe('radioPlayerComponent', () => {
  let component: radioPlayerComponent;
  let fixture: ComponentFixture<radioPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ radioPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(radioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
