import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotels.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserAdminService } from 'src/app/services/userAdmin/user-admin.service';

@Component({
  selector: 'app-hotels-admin-h',
  templateUrl: './hotels-admin-h.component.html',
  styleUrls: ['./hotels-admin-h.component.css']
})
export class HotelsAdminHComponent implements OnInit {

  hotels: any =[] ;
  hotel: HotelModel;
  userA:any=[];
  hotelUpdate = {
    _id: "", name:"", direction:"", phone:"", email:""
  }

  constructor(
    private hotelRest: HotelRestService,
    private userARest: UserAdminService
  ) { 
    this.hotel = new HotelModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getHotels();

  }

  getHotels(){
    this.hotelRest.getHotelByAdmin().subscribe({
      next:(res:any)=>{
        this.hotels= res.hotelExist;
        console.log(this.hotels)
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  getHotelById(idHotel:any){
    this.hotelRest.getHotel(idHotel).subscribe({
      next: (res:any)=> {
        this.hotelUpdate._id = res.hotel._id;
        this.hotelUpdate.name = res.hotel.name;
        this.hotelUpdate.direction = res.hotel.direction;
        this.hotelUpdate.phone= res.hotel.phone;
        this.hotelUpdate.email= res.hotel.email;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  saveHotels(){
    this.hotelRest.saveHotels(this.hotel).subscribe({
      next: (res:any)=>{alert(res.message);
      this.getHotels();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }

  updateHotel(){
    this.hotelRest.updateHotel(this.hotelUpdate._id, this.hotelUpdate).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getHotels();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }


}
