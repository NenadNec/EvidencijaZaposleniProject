import { Component, OnInit } from '@angular/core';
import { ZaposleniService } from './zaposleni.service';
import { MatDialog } from '@angular/material/dialog';
import { NoviZaposleniComponent } from '../novi-zaposleni/novi-zaposleni.component';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.scss'],
})
export class ZaposleniComponent implements OnInit {
  zaposleniList: any[] = [];
  magaciniList: any[] = [];
  showForm: boolean = false;

  constructor(
    private zaposleniService: ZaposleniService,
    private dialog: MatDialog
  ) {
    console.log("Constrctor zaposleni service",this.zaposleniService);
  }

  ngOnInit(): void {
    this.getZaposleni();
  }

  getZaposleni(): void {
    this.zaposleniService.getZaposleni().subscribe(
      (response: any) => {
        this.zaposleniList = response.$values;
  
        // Dodajte kod za dodeljivanje naziva magacina
        this.zaposleniList.forEach((zaposleni: any) => {
          if (zaposleni.magacini && zaposleni.magacini.length > 0) {
            const magacin = zaposleni.magacini[0]?.magacin;
            zaposleni.nazivMagacina = magacin ? magacin.naziv : '';
          }
        });
  
        console.log("Zaposleni list",this.zaposleniList);
        this.showForm = true;
      },
      (error) => {
        console.log('Greška prilikom dobavljanja zaposlenih:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoviZaposleniComponent, {
      width: '400px',
      data: {
        magaciniList: this.zaposleniService.getMagacini(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.getZaposleni();
      }
    });
  }









  
  getMagacinById(magacinId: number): any {
    for (const zaposleni of this.zaposleniList) {
      const magacin = zaposleni.magacini.$values.find((m: any) => m.magacinId === magacinId);
      if (magacin) {
        return magacin;
      }
    }
    return null;
  }
  
  
  
  
  



  
}
