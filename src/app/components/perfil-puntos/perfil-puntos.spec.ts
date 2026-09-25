import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPuntos } from './perfil-puntos';

describe('PerfilPuntos', () => {
  let component: PerfilPuntos;
  let fixture: ComponentFixture<PerfilPuntos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPuntos],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPuntos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
