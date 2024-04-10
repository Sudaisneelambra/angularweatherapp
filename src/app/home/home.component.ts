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
  dailyForecastsArray:any;

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
            this.weatherservice.errorboolean=true
            this.weatherservice.errordata='current wether getting failed. please refresh..'
          }
        })

        this.weatherservice.getfutureforcast(this.latitude,this.longitude).subscribe({
          next:(res)=>{
            if (res) {
              const futureweather = res.list;
              this.dailyForecastsArray = [];
              const dailyForecasts:any = {};

              futureweather.forEach((item:any) => {
                const date = new Date(item.dt * 1000);
                const day = date.toDateString();

                if (!dailyForecasts[day]) {
                  dailyForecasts[day] = {
                    temperatures: [],
                    descriptions: [],
                    dates: [],
                    icons: [],
                  };
                }

                const temperature = item.main.temp;
                const description = item.weather[0].description;
                const icon = item.weather[0].icon;

                dailyForecasts[day].temperatures.push(temperature);
                dailyForecasts[day].descriptions.push(description);
                dailyForecasts[day].dates.push(date);
                dailyForecasts[day].icons.push(icon);
              });
              for (const day in dailyForecasts) {
                const forecast = {
                  day: day,
                  temperatures: dailyForecasts[day].temperatures,
                  descriptions: dailyForecasts[day].descriptions,
                  dates: dailyForecasts[day].dates,
                  icons: dailyForecasts[day].icons,
                };
                this.dailyForecastsArray.push(forecast);
              }
            } else {
              this.weatherservice.errorboolean=true
               this.weatherservice.errordata='future forcast weather getting failed.please refresh..'
              
            }
          },
          error:(err)=>{
            this.weatherservice.errorboolean=true
            this.weatherservice.errordata='future forcast weather getting failed.please refresh..'
            
          }
        })
      }
      
    })
    .catch((error: any) => {
      this.weatherservice.errorboolean=true
      this.weatherservice.errordata='Error getting location'
        
    });
  }

  options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  currentDate = new Date();
  
  
  formattedDate = this.formatDate(this.currentDate);

  formatDate(date:any) {
    return new Date(date).toLocaleDateString('en-IN', this.options);
  }


  search(value:any){
    this.weatherservice.getweatherwithcity(value).subscribe({
      next:(res)=>{
        const weatherdata=res
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
        this.weatherservice.errorboolean=true
        this.weatherservice.errordata='no city found please enter the correct city name'
      }
    })

    this.weatherservice.getfutureforcastsearch(value).subscribe({
      next:(res)=>{
        if (res) {
          const futureweather = res.list;
          this.dailyForecastsArray = [];
          const dailyForecasts:any = {};

          futureweather.forEach((item:any) => {
            const date = new Date(item.dt * 1000);
            const day = date.toDateString();

            if (!dailyForecasts[day]) {
              dailyForecasts[day] = {
                temperatures: [],
                descriptions: [],
                dates: [],
                icons: [],
              };
            }

            const temperature = item.main.temp;
            const description = item.weather[0].description;
            const icon = item.weather[0].icon;

            dailyForecasts[day].temperatures.push(temperature);
            dailyForecasts[day].descriptions.push(description);
            dailyForecasts[day].dates.push(date);
            dailyForecasts[day].icons.push(icon);
          });
          for (const day in dailyForecasts) {
            const forecast = {
              day: day,
              temperatures: dailyForecasts[day].temperatures,
              descriptions: dailyForecasts[day].descriptions,
              dates: dailyForecasts[day].dates,
              icons: dailyForecasts[day].icons,
            };
            this.dailyForecastsArray.push(forecast);
          }
        } else {
          this.weatherservice.errorboolean=true
          this.weatherservice.errordata='no city found please enter the correct city name'
          
        }
      },
      error:(err)=>{
        this.weatherservice.errorboolean=true
        this.weatherservice.errordata='no city found please enter the correct city name'
        
      }
    })
  }

}
