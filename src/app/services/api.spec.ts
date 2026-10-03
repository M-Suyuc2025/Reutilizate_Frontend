import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService, API_URL } from './api';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login hace POST a /auth/login', () => {
    service.login({ email: 'a@a.com', password: '123456' }).subscribe();
    const req = http.expectOne(`${API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'ok', token: 't', user: { id: 1, name: 'A', email: 'a@a.com' } });
  });

  it('clasificarResiduo envía el archivo en el campo "image"', () => {
    const archivo = new File(['x'], 'foto.png', { type: 'image/png' });
    service.clasificarResiduo(archivo).subscribe();
    const req = http.expectOne(`${API_URL}/waste/classify`);
    expect((req.request.body as FormData).get('image')).toBeTruthy();
    req.flush({ material: 'plastic', confidence: 0.9, pointsEarned: 10, saved: false, reuseIdeas: [] });
  });
});
