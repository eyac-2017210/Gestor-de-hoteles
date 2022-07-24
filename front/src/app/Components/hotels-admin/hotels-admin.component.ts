import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotels.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserAdminService } from 'src/app/services/userAdmin/user-admin.service';

@Component({
  selector: 'app-hotels-admin',
  templateUrl: './hotels-admin.component.html',
  styleUrls: ['./hotels-admin.component.css']
})
export class HotelsAdminComponent implements OnInit {
  hotels: any =[] ;
  hotel: HotelModel;
  userA:any=[];

  constructor(
    private hotelRest: HotelRestService,
    private userARest: UserAdminService
  ) {
    this.hotel = new HotelModel('', '', '', '', '', '');
   }

  ngOnInit(): void {
    this.getHotels();
    this.getUsers();
  }
  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next:(res:any)=>{
        this.hotels= res.hoteles;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  getUsers(){
    this.userARest.getUsers().subscribe({
      next:(res:any)=>{
        this.userA= res.users;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  saveHotels(){
    this.hotelRest.saveHotels(this.hotel).subscribe({
      next: (res:any)=>{alert(res.message);
      this.getHotels();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }
}
