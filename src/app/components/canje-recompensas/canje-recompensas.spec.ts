import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CanjeRecompensas } from './canje-recompensas';

describe('CanjeRecompensas', () => {
  let component: CanjeRecompensas;
  let fixture: ComponentFixture<CanjeRecompensas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanjeRecompensas],
    }).compileComponents();

    fixture = TestBed.createComponent(CanjeRecompensas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
