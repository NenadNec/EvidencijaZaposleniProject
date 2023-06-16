import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() { }

  login() {
    // logiku za prijavljivanje
    this.loggedIn = true;
  }

  logout() {
    // logiku za odjavljivanje
    this.loggedIn = false;
    console.log(this.loggedIn)
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
