import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { HotelModel } from 'src/app/models/hotels.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels:any;
  hotelsModel: HotelModel;

  constructor(
    private hotelRest : HomeService
  ) {
    this.hotelsModel=new HotelModel('','','','','','');
   }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next: (res:any)=> {this.hotels = res.hoteles;},
      error: (err)=> alert(err.error.message)
    })
  }

}
