import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createChannelComponent } from './createChannel.component';

describe('createChannelComponent', () => {
  let component: createChannelComponent;
  let fixture: ComponentFixture<createChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ createChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(createChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
