import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Captura } from './captura';

describe('Captura', () => {
  let component: Captura;
  let fixture: ComponentFixture<Captura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Captura],
    }).compileComponents();

    fixture = TestBed.createComponent(Captura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
