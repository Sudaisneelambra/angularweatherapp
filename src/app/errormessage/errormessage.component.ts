import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { WeatherserviceService } from "../weatherservice.service";

@Component({
    selector:'app-error-component',
    templateUrl:'./errormessage.component.html',
    styleUrls:['./errormessage.component.css'],
    standalone:true,
    imports:[CommonModule]

})

export class ErrorComponent implements OnInit {

    constructor(private service:WeatherserviceService){}
    message:string = "";


    ngOnInit() {
        this.message=this.service.errordata
    }

    refresh(){
        window.location.reload();
    }
}