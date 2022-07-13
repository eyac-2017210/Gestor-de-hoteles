import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsAdminHComponent } from './rooms-admin-h.component';

describe('RoomsAdminHComponent', () => {
  let component: RoomsAdminHComponent;
  let fixture: ComponentFixture<RoomsAdminHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsAdminHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsAdminHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
