import { Component, Input, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CurrentWeather, ForecastWeather, HourlyForecast } from './shared/model/weather.model';
import { WeatherServiceService } from './shared/service/weather-service.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  todayWheather!: CurrentWeather;
  forecastData!: ForecastWeather;
  forecastInfo: HourlyForecast[] = [];
  timezonedForecastInfo:HourlyForecast[] = [];
  city!: string;
  sunrise!:number;
  sunset!: number;
  duration!:number;
  currentDate!:string;
  currentDay!:number;
  currentMonth!:number;
  currentYear!:number;
  fullTime!:string;
  durationTime!:string;
  oneDayForecast!: HourlyForecast;
  threeHoursData: HourlyForecast[] = [];
  selectedDate: number = 0
  
  
  constructor( private weatherService: WeatherServiceService){
  }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather("Minsk")
    
  }
 
  getCurrentWeather(){
    
    return this.weatherService.getCurrentWeather(`${this.city}`).subscribe((todayWheather: CurrentWeather) => {
      this.todayWheather = todayWheather;
      console.log(this.todayWheather);
      
    })
  }

  getForecastWeather(){ 
    return this.weatherService.getForecastWeather(`${this.city}`).subscribe((forecastData: ForecastWeather) => {
      this.forecastData = forecastData;
      this.forecastInfo = forecastData?.list;
      this.timezonedForecastInfo = this.changeForecastTimezone(this.forecastInfo);
      
    })
  }


  changeForecastTimezone(localData: HourlyForecast[]) {
    return localData.map((el) => {
      return {...el,dt: el.dt + new Date(el.dt * 1000).getTimezoneOffset() * 60 + this.forecastData.city.timezone};
    });
  }

  getIcon(icon: string | undefined) {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }


  
  getTime(time: number) {
    const baseTime = time + new Date().getTimezoneOffset()*60;    
    const correctTime = (baseTime + this.todayWheather.timezone)*1000;
    const hours:number = new Date(correctTime).getHours();
    const minutes: number = new Date(correctTime).getMinutes();
    if(hours < 10 && minutes < 10){
      this.fullTime = `0${hours}:0${minutes}`
    }else if(hours < 10){
      this.fullTime = `0${hours}:${minutes}`
    }else if(minutes < 10){
      this.fullTime = `${hours}:0${minutes}`
    }else{
      this.fullTime = `${hours}:${minutes}`
    }
    return this.fullTime;
  }


  getDurationTime(start:number, end:number){
    const dif = end - start;    
    const durationHours:number =  Math.floor((dif / 3600) % 24);
    const durationMinutes:number =  Math.floor((dif / 60) % 60);
    if(durationHours < 10){
      this.durationTime = `0${durationHours}:${durationMinutes}`
    }else if( durationMinutes < 10){
      this.durationTime = `${durationHours}:0${durationMinutes}`
    }else if( durationHours < 10 && durationMinutes < 10){
      this.durationTime = `0${durationHours}:0${durationMinutes}`
    }else{
      this.durationTime = `${durationHours}:${durationMinutes}`
    }
    return this.durationTime
  }



  getThreeHoursData(arr: HourlyForecast[], date: number) {
    return arr.filter(
      (el) =>
        new Date(el.dt * 1000).getDate() == new Date(date * 1000).getDate()
    );
  }
  
}
