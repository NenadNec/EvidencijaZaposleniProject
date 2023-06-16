import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherData(cityId: number, apiKey: string): Observable<any> {
    const apiUrl = `https://localhost:5001/api/vreme`;

    const params = new HttpParams()
      .set('id', cityId.toString())
      .set('appid', apiKey)
      .set('units', 'metric');

    return this.http.get(apiUrl, { params });
  }
}
