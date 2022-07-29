import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotels.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: any =[] ;
  hotel: HotelModel;
  role: String = '';
  search: any;
  searchD: any;

  constructor(
    private hotelRest: HotelRestService,
    public userRest: UserRestService
  ) { 
    this.hotel = new HotelModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getHotels();
    this.role = this.userRest.getIdentity().role;
  }

  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next:(res:any)=>{
        this.hotels= res.hoteles;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
}
