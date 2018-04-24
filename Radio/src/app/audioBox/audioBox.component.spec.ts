import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { audioBoxComponent } from './audioBox.component';

describe('audioBoxComponent', () => {
  let component: audioBoxComponent;
  let fixture: ComponentFixture<audioBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ audioBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(audioBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
