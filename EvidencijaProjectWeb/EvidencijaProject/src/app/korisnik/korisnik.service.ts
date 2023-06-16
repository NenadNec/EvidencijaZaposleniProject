import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) {}

  registracija(registracijaModel: any): Observable<any> {
    const url = `${this.apiUrl}/api/Korisnik/Registracija`;
    return this.http.post(url, registracijaModel);
  }
  

  logIn(loginModel: any): Observable<any> {
    const url = `${this.apiUrl}/api/Korisnik/LogIn`;
    return this.http.post(url, loginModel);
  }
}
