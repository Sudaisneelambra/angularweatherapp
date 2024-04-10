import { Component, DoCheck, OnInit } from '@angular/core';
import { ErrorComponent } from './errormessage/errormessage.component';
import { WeatherserviceService } from './weatherservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,DoCheck{
  
  title = 'weather';
  errorboolean!:boolean

  constructor(private service:WeatherserviceService){}

  ngDoCheck(): void {
        this.errorboolean=this.service.errorboolean
  }

  ngOnInit(): void {
    this.errorboolean=this.service.errorboolean
  }


}
