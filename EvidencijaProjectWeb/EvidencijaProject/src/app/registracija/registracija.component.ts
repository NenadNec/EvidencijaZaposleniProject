import { Component } from '@angular/core';
import { KorisnikService } from '../korisnik/korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface RegistracijaModel {
  ime: string;
  user: string;
  password: string;
}

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss'],
})
export class RegistracijaComponent {
  registracijaModel: RegistracijaModel = {
    ime: '',
    user: '',
    password: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private korisnikService: KorisnikService, private toastr: ToastrService, private router: Router) {}

  submitForm(): void {
    this.korisnikService.registracija(this.registracijaModel).subscribe(
      (response: any) => {
        if (response === true) {
          this.successMessage = 'Registracija uspešna';
           // Redirekcija na login putanju
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.clearToastr();
          }, 3000);

         
         
        } else {
          this.errorMessage = 'Korisnik već postoji';
          this.clearToastr();
        }
      },
      (error: any) => {
        console.log('Greška prilikom registracije:', error);
        this.errorMessage = 'Došlo je do greške prilikom registracije. Molimo Vas pokušajte ponovo kasnije.';
        this.clearToastr();
      }
    );
  }

  clearToastr() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
