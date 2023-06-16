import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ZaposleniService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) {}

  getZaposleni(): Observable<any> {
    const url = `${this.apiUrl}/api/Zaposleni/GetAllZaposleniWithMagacini`;
    return this.http.get(url).pipe(
      tap(response => console.log("Get zaposleni response", response)),
      catchError(error => {
        console.error('Greška prilikom dobavljanja zaposlenih:', error);
        return throwError(error);
      })
    );
  }
  
  

  dodajZaposlenog(zaposleni: any): Observable<any> {
    const url = `${this.apiUrl}/api/Zaposleni/AddZaposleni`;
    return this.http.post(url, zaposleni).pipe(
      tap(response => console.log(response)),
      catchError(error => {
        console.log('Greška prilikom dodavanja zaposlenog:', error);
        return throwError(error);
      })
    );
  }
  

  getMagacini(): Observable<any> {
    const url = `${this.apiUrl}/api/Magacin`;
    return this.http.get(url).pipe(
      tap(response => console.log("Get magacini response", response)),
      catchError(error => {
        console.error('Greška prilikom dobavljanja magacina:', error);
        return throwError(error);
      })
    );
  }
  
}
