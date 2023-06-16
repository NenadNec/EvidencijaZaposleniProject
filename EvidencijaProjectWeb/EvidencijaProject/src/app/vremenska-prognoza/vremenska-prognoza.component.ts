// vremenska-prognoza.component.ts

import { Component } from '@angular/core';
import { WeatherService } from './vremenska-prognoza.service';

@Component({
  selector: 'app-vremenska-prognoza',
  templateUrl: './vremenska-prognoza.component.html',
  styleUrls: ['./vremenska-prognoza.component.scss']
})
export class VremenskaPrognozaComponent {
  weatherData: any[] = [];
  cityData: any = {};

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    const cityId = 524901;
    const apiKey = '1ae548272250149d824f4d78ab808830';
  
    this.weatherService.getWeatherData(cityId, apiKey).subscribe(
      (response) => {
        console.log(response)
        this.weatherData = response.list;
        this.cityData = response.city;
      },
      (error) => {
        console.error(error);
  
        if (error.status === 404) {
          console.log('Vremenska prognoza nije pronađena.');
        } else if (error.status === 500) {
          console.log('Došlo je do greške na serveru. Pokušajte ponovo kasnije.');
        } else {
          console.log('Došlo je do greške pri dobavljanju vremenskih podataka.');
        }
      }
    );
  }
  
  
}
