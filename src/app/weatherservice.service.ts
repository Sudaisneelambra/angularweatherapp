import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  WeatherApi=environment.WEATHER_API
  weatherapiwithcity=environment.Weather_API_WITH_CITY
  weatherApiKey=environment.WEATHER_API_kEY
  
  constructor(private http:HttpClient) { }

  latitude:any
  longitude:any


  getcurrentlocation(): Promise<{ latitude: number, longitude: number }>{
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert('User canceled the request for Geolocation. Please give permission.');
                            console.log('User canceled the request for Geolocation.');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert('Location information is unavailable.');
                            console.log('Location information is unavailable.');
                            break;
                        case error.TIMEOUT:
                            alert('Get user location timed out.');
                            console.log('Get user location timed out.');
                            break;
                    }
                    reject(error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            reject('Geolocation is not supported by this browser.');
        }
    });
}

  getcurrentweather(lat:any,log:any){
  return this.http.get<any>(`${this.WeatherApi}lat=${lat}&lon=${log}&appid=${ this.weatherApiKey}`)
 }

 getweatherwithcity(city:any){
   return this.http.get<any>(`${this.weatherapiwithcity}q=${city}&units=metric&appid=${this.weatherApiKey}`)

 }
}
