import { Component } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  latitude:any
  longitude:any
  placeName:any
  nationality:any
  weathericon:any
  weathertype:any
  temperature:any
  wind:any
  humidity:any
  sealevel:any

  constructor(private weatherservice:WeatherserviceService){}

  ngOnInit(): void {

    this.weatherservice.getcurrentlocation()
    .then((location: { latitude: number, longitude: number}) => {
      this.latitude=location.latitude
      this.longitude=location.longitude
      if(this.latitude && this.longitude){
        this.weatherservice.getcurrentweather(this.latitude,this.longitude).subscribe({
          next:(res)=>{
            const weatherdata=res
            console.log(res);
            this.placeName=weatherdata.name
            this.nationality=weatherdata.sys.country
            this.weathericon=`https://api.openweathermap.org/img/w/${weatherdata?.weather[0].icon}.png`
            this.weathertype=weatherdata?.weather[0].description
            this.temperature=weatherdata?.main.temp
            this.wind=weatherdata?.wind.speed
            this.humidity=weatherdata?.main.humidity
            this.sealevel=weatherdata?.main.sea_level


          },
          error:(err)=>{
            console.log(err);
          }
        })
        
      }
      
    })
    .catch((error: any) => {
        console.error('Error getting location:', error);
    });
  }

  options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  currentDate = new Date();
  
  
  formattedDate = this.formatDate(this.currentDate);

  formatDate(date:any) {
    return new Date(date).toLocaleDateString('en-IN', this.options);
  }

}
