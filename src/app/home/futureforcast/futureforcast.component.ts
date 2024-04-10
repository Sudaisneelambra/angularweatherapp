import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-futureforcast',
  templateUrl: './futureforcast.component.html',
  styleUrls: ['./futureforcast.component.css']
})
export class WeatherdescriptionComponent {

  @Input() dailyForecastsArray:any

}
