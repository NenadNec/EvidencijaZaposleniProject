import { Component, OnInit } from '@angular/core';
import { KupciService } from './kupci.service';
import { ZaposleniService } from '../zaposleni/zaposleni.service';
import { NoviKupacComponent } from '../novi-kupac/novi-kupac.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kupci',
  templateUrl: './kupci.component.html',
  styleUrls: ['./kupci.component.scss'],
})
export class KupciComponent implements OnInit {
  selectedZaposleni: string;
  zaposleniList: any[];
  kupciList: any[] = [];
  selectedKupac: any;
  showDialog: boolean = false;
  kupac: any;
  
  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private zaposleniService: ZaposleniService,
    private kupciService: KupciService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.selectedZaposleni = '';
    this.zaposleniList = [];
    this.kupciList = [];
  }

  ngOnInit(): void {
    this.zaposleniService.getZaposleni().subscribe(
      (response: any) => {
        if (Array.isArray(response.$values)) {
          this.zaposleniList = response.$values.map((zaposleni: any) => {
            return {
              id: zaposleni.id,
              ime: zaposleni.ime,
              prezime: zaposleni.prezime
            };
          });
          this.selectedZaposleni = this.zaposleniList[0].id;
          this.getKupci();
        } else {
          console.log('Greška prilikom dobavljanja zaposlenih: Odgovor nije u očekivanom formatu.');
        }
      },
      (error) => {
        console.log('Greška prilikom dobavljanja zaposlenih:', error);
      }
    );
  }

  getKupci(): void {
    if (this.selectedZaposleni) {
      console.log('Selected zaposleni:', this.selectedZaposleni);
      this.kupciService.getKupci(this.selectedZaposleni).subscribe(
        (response: any) => {
          console.log(response);
          if (response.$values && Array.isArray(response.$values)) {
            this.kupciList = response.$values;
          } else {
            console.log('Nedostaju podaci o kupcima u odgovoru.');
          }
        },
        (error) => {
          console.log('Greška prilikom dobavljanja kupaca:', error);
        }
      );
    }
  }

  izmeniKupca(kupac: any): void {
    this.selectedKupac = kupac;
  }
  
  kupacIsValid(kupac: any): boolean {
    return kupac.naziv && kupac.pib && kupac.sifra;
  }
  
  selectedKupacIsValid(): boolean {
    return this.selectedKupac && this.selectedKupac.naziv && this.selectedKupac.pib && this.selectedKupac.sifra;
  }
  
  sacuvajIzmene(): void {
    this.kupciService.izmeniKupca(this.selectedKupac).subscribe(
      (response: any) => {
        console.log('Izmena kupca uspešna:', response);
        // Resetujte izabrani kupac i osvežite listu kupaca
        this.selectedKupac = null;
        this.successMessage = 'Dodavanje kupca uspešno:';    
        setTimeout(() => {
          this.getKupci();
          this.clearToastr();
        }, 2000);

      },
      (error: any) => {
        console.log('Greška prilikom izmene kupca:', error);
      }
    );
  }
  
  obrisiKupca(kupac: any): void {
    this.kupciService.obrisiKupca(kupac.id).subscribe(
      (response: any) => {
        console.log('Brisanje kupca uspešno:', response);
        // Ažuriranje liste kupaca nakon brisanja kupca
  
        this.errorMessage = 'Brisanje kupca uspešno:';
        setTimeout(() => {
          this.getKupci();
          this.clearToastr();
        }, 2000);
      },
      (error: any) => {
        console.log('Greška prilikom brisanja kupca:', error);
      }
    );
  }


  
//Validacija dijalog izmena kupci

obrisiKupcaDialog(kupac: any): void {
  this.showDialog = true;
  this.kupac = kupac;
}

potvrdiBrisanje(kupac: any): void {
  this.showDialog = false;
  this.obrisiKupca(kupac);
}


otkaziBrisanje(): void {
  this.showDialog = false;
}

odustani(): void {
  this.selectedKupac = null;
  this.getKupci();
}


  

  dodajKupca(noviKupac: any): void {
    this.kupciService.dodajKupca(noviKupac).subscribe(
      (response: any) => {
        console.log('Dodavanje kupca uspešno:', response);
     
      },
      (error: any) => {
        console.log('Greška prilikom dodavanja kupca:', error);
      }
    );
  }
  


 

  openNoviKupacForm(): void {
    const dialogRef = this.dialog.open(NoviKupacComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog je zatvoren', result);
      // Ažuriranje liste kupaca nakon zatvaranja dijaloga
      this.getKupci();
    });
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


  onZaposleniChange(): void {
    this.getKupci();
  }

}
