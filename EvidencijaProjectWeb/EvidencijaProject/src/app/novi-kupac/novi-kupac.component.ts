import { Component, OnInit } from '@angular/core';
import { KupciService } from '../kupci/kupci.service';
import { ZaposleniService } from '../zaposleni/zaposleni.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novi-kupac',
  templateUrl: './novi-kupac.component.html',
  styleUrls: ['./novi-kupac.component.scss'],
})
export class NoviKupacComponent implements OnInit {
  zaposleniList: any[] = [];
  noviKupac: any = {
    naziv: '',
    pib: '',
    sifra: '',
    zaposleniId: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private kupciService: KupciService,
    private zaposleniService: ZaposleniService,
    private dialogRef: MatDialogRef<NoviKupacComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getZaposleni();
  }

  getZaposleni(): void {
    this.zaposleniService.getZaposleni().subscribe(
      (response: any) => {
        if (response.$values && Array.isArray(response.$values)) {
          this.zaposleniList = response.$values;
        } else {
          console.log('Nedostaju podaci o zaposlenima u odgovoru.');
        }
      },
      (error) => {
        console.log('Greška prilikom dobavljanja zaposlenih:', error);
      }
    );
  }

  submitForm(): void {
    console.log('Podaci o novom kupcu:', this.noviKupac);
    // Dodela ID-a zaposlenog na osnovu odabranog zaposlenog u formi
    this.noviKupac.zaposleniId = Number(this.noviKupac.zaposleniId);
    this.kupciService.dodajKupca(this.noviKupac).subscribe(
      (response: any) => {
        console.log(response);
        // Ažuriranje liste kupaca nakon dodavanja novog kupca
        this.successMessage = 'Dodavanje kupca uspešno:';
              setTimeout(() => {
                this.closeForm();
                this.clearToastr();
              }, 3000);
        
        this.kupciService.getKupci(this.noviKupac.zaposleniId).subscribe(
          (response: any) => {
            console.log(response);
            if (response && Array.isArray(response)) {
              this.kupciService.kupciList = response;
              
            }
          },
          (error) => {
            console.log('Greška prilikom dobavljanja kupaca:', error);
            this.errorMessage = 'Greška prilikom dobavljanja kupaca. Obratite se administratoru';
            setTimeout(() => {
              this.clearToastr();
            }, 3000);
          }
        );
      },
      (error: any) => {
        console.log('Greška prilikom dodavanja kupca!:', error);
        this.errorMessage = 'Greška prilikom dodavanja kupca. Obratite se administratoru';
        setTimeout(() => {
          this.clearToastr();
        }, 3000);
      }
    );
  }

  closeForm(): void {
    this.dialogRef.close();
    this.successMessage = 'Dodavanje kupca uspešno:';
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
