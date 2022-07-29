import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotels.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotelUpdate: any;
  hotels: any =[] ;
  query = '';
  hotel: HotelModel;
  search: any;
  searchD: any;

  constructor(
    private hotelRest: HotelRestService,
  ) {
    this.hotel = new HotelModel('', '', '', '', '', '');
   }

  ngOnInit(): void {
    this.getHotels()
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
