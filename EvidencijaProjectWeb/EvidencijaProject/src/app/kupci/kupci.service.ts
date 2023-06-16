import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KupciService {
  private apiUrl = 'https://localhost:5001'; // Ispravljen URL
  kupciList: any[] = [];
  
  constructor(private http: HttpClient) { }

  getKupci(zaposleniId: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/Kupac/Zaposleni/${zaposleniId}`;
    return this.http.get<any[]>(url).pipe(
      tap((response) => console.log('Response from getKupciByZaposleniId:', response))
    );
  }

  dodajKupca(noviKupac: any): Observable<boolean> {
    const url = 'https://localhost:5001/api/Kupac/AddKupac';
    return this.http.post<boolean>(url, noviKupac).pipe(
      tap((response) => console.log('Response from dodajKupca:', response))
    );
  }
  

  izmeniKupca(kupac: any): Observable<any> {
    const url = `${this.apiUrl}/api/Kupac/${kupac.id}`;
    // Mapiranje podataka iz modela DodajKupca
    const izmenjeniPodaci = {
      id: kupac.id,
      naziv: kupac.naziv,
      pib: kupac.pib,
      sifra: kupac.sifra,
      zaposleniId: kupac.zaposleniId
    };
    return this.http.put<any>(url, izmenjeniPodaci);
  }
  

  obrisiKupca(kupacId: number): Observable<any> {
    const url = `${this.apiUrl}/api/Kupac/${kupacId}`;
    return this.http.delete<any>(url);
  }
}
