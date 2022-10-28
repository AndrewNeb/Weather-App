import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather, ForecastWeather } from '../model/weather.model';

const API_KEY = "02ef6088c3f9de65b549c1b9d755ce8d";
const API_URL = " https://api.openweathermap.org/data/2.5";

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient:HttpClient) { }

  getCurrentWeather(cityName: string): Observable<CurrentWeather> {
    return this.httpClient.get<CurrentWeather>(`${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    
  }

  getForecastWeather(cityName: string): Observable<ForecastWeather> {
    return this.httpClient.get<ForecastWeather>(`${API_URL}/forecast?q=${cityName}&units=metric&appid=${API_KEY}`)
  }
}




