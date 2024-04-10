import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  WeatherApi=environment.WEATHER_API
  weatherApiKey=environment.WEATHER_API_kEY
  WeatherForcatApi=environment.Wether_API_Future
  
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

  getcurrentweather(lat:any,log:any):Observable<any>{
  return this.http.get<any>(`${this.WeatherApi}lat=${lat}&lon=${log}&appid=${ this.weatherApiKey}`)
 }

 getweatherwithcity(city:any):Observable<any>{
   return this.http.get<any>(`${this.WeatherApi}q=${city}&units=metric&appid=${this.weatherApiKey}`)
 }

 getfutureforcast(lat:any,long:any):Observable<any>{
  return this.http.get(`${this.WeatherForcatApi}lat=${lat}&lon=${long}&appid=${ this.weatherApiKey}`)
 }

 getfutureforcastsearch(city:any):Observable<any>{
  return this.http.get(`${this.WeatherForcatApi}q=${city}&appid=${ this.weatherApiKey}`)
 }
}
