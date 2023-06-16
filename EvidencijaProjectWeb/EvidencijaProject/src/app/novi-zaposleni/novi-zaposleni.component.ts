import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ZaposleniService } from '../zaposleni/zaposleni.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-novi-zaposleni',
  templateUrl: './novi-zaposleni.component.html',
  styleUrls: ['./novi-zaposleni.component.scss'],
})
export class NoviZaposleniComponent implements OnInit {
  zaposleniForm!: FormGroup;
  
  noviZaposleni: any = {
    magacini: []
  };

  magaciniList: any[] = [];
  selectedMagacini: number[] = [];



  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<NoviZaposleniComponent>,
    private zaposleniService: ZaposleniService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log("Novi Zaposleni", this.noviZaposleni);
    this.ucitajMagacine();
    this.zaposleniForm = this.formBuilder.group({
      ime: [this.noviZaposleni.ime, Validators.required],
      prezime: [this.noviZaposleni.prezime, Validators.required],
      sifra: [this.noviZaposleni.sifra, Validators.required],
      grad: [this.noviZaposleni.grad, Validators.required],
      magacini: [[]]
    });
  }
  
  get magaciniFormArray(): FormArray {
    return this.zaposleniForm.get('magacini') as FormArray;
  }

  ucitajMagacine(): void {
    this.zaposleniService.getMagacini().subscribe(
      (response: any) => {
        console.log("Ucitaj magacine", response);
        this.magaciniList = response.$values;
        console.log(this.magaciniList);
      },
      (error: any) => {
        console.log('Greška prilikom učitavanja magacina:', error);
      }
    );
  }
  

  submitForm(): void {
    const noviZaposleni = {
      ime: this.zaposleniForm.value.ime,
      prezime: this.zaposleniForm.value.prezime,
      sifra: this.zaposleniForm.value.sifra,
      grad: this.zaposleniForm.value.grad,
      zaposleniMagacini: this.selectedMagacini.length > 0 ? this.selectedMagacini : null
    };
  
    console.log("Novi zaposleni", noviZaposleni);
  
    this.zaposleniService.dodajZaposlenog(noviZaposleni).subscribe(
      (response: any) => {
        console.log('Dodavanje zaposlenog uspešno:', response);
        
        console.log('Novi zaposleni detalji:', response); // Prikazuje detalje novog zaposlenog

        this.successMessage = 'Dodavanje zaposlenog uspešno:';

              setTimeout(() => {
                this.dialogRef.close();
                this.router.navigateByUrl('/stranica-sa-navigacijom');
                this.clearToastr();
              }, 2000);
      },
      (error: any) => {
        console.log('Greška prilikom dodavanja zaposlenog:', error);
      }
    );
  }
  

  closeDialog() {
    this.dialogRef.close();
  }

  // onSelectionChange(event: any) {
  //   this.selectedMagacini = event.source.selectedOptions.selected.map((item: any) => item.value);
  // }

  onSelectionChange(checked: boolean, magacinId: number) {
    if (checked) {
      // Dodajte magacin u selectedMagacini niz
      this.selectedMagacini.push(magacinId);
    } else {
      // Uklonite magacin iz selectedMagacini niza
      const index = this.selectedMagacini.indexOf(magacinId);
      if (index > -1) {
        this.selectedMagacini.splice(index, 1);
      }
    }
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
