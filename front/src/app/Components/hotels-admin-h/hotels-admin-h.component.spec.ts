import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsAdminHComponent } from './hotels-admin-h.component';

describe('HotelsAdminHComponent', () => {
  let component: HotelsAdminHComponent;
  let fixture: ComponentFixture<HotelsAdminHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsAdminHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsAdminHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
