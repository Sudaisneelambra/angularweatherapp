import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Input() placeName:any
@Input() nationality:any
@Output() serchvalue=new EventEmitter<any>()


searching(val:any){
  this.serchvalue.emit(val)
}
}
