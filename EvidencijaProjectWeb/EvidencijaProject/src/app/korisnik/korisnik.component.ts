import { Component } from '@angular/core';
import { KorisnikService } from './korisnik.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.scss'],
})
export class KorisnikComponent {
  noviKorisnik: any = {};

  constructor(private korisnikService: KorisnikService) {}

  submitForm(): void {
    this.korisnikService.registracija(this.noviKorisnik).subscribe(
      (response) => {
        console.log('Registracija uspešna:', response);
        
      },
      (error) => {
        console.log('Greška prilikom registracije:', error);
      }
    );
  }
}
