import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { KupciComponent } from './kupci/kupci.component';
import { NoviKupacComponent } from './novi-kupac/novi-kupac.component';
import { VremenskaPrognozaComponent } from './vremenska-prognoza/vremenska-prognoza.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'zaposleni', component: ZaposleniComponent },
  { path: 'kupci', component: KupciComponent },
  { path: 'stranica-sa-navigacijom', component: ZaposleniComponent },
  { path: 'vremenska-prognoza', component: VremenskaPrognozaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, 
  { path: 'novi-kupac', component: NoviKupacComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
