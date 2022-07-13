import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAdminHComponent } from './events-admin-h.component';

describe('EventsAdminHComponent', () => {
  let component: EventsAdminHComponent;
  let fixture: ComponentFixture<EventsAdminHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAdminHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAdminHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
