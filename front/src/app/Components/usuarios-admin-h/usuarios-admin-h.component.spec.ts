import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdminHComponent } from './usuarios-admin-h.component';

describe('UsuariosAdminHComponent', () => {
  let component: UsuariosAdminHComponent;
  let fixture: ComponentFixture<UsuariosAdminHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAdminHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAdminHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
