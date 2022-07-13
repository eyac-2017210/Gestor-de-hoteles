import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsAdminComponent } from './hotels-admin.component';

describe('HotelsAdminComponent', () => {
  let component: HotelsAdminComponent;
  let fixture: ComponentFixture<HotelsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
