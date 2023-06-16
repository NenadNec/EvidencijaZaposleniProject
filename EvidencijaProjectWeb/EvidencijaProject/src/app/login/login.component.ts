import { Component } from '@angular/core';
import { KorisnikService } from '../korisnik/korisnik.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private korisnikService: KorisnikService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.korisnikService.logIn(this.loginForm.value).subscribe(
        (response: boolean) => {
          if (response) {
            this.successMessage = 'Uspešna prijava';
            this.authService.login();
            setTimeout(() => {
              this.router.navigate(['/zaposleni']);
              this.clearToastr();
            }, 3000);
          } else {
            this.errorMessage = 'Nevažeći korisnik ili lozinka';
            setTimeout(() => {
              this.clearToastr();
            }, 3000);
          }
        },
        (error: any) => {
          console.log('Greška prilikom prijavljivanja:', error);
          this.errorMessage = 'Došlo je do greške prilikom prijavljivanja. Molimo Vas pokušajte ponovo kasnije.';
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  

  navigateToRegistration(): void {
    this.router.navigate(['/registracija']);
  }

  clearToastr(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  showNotification(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: panelClass
    });
  }


  
}
