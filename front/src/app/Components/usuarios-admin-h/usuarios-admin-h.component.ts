import { Component, OnInit } from '@angular/core';
import { ReservationModel } from 'src/app/models/reservation.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Component({
  selector: 'app-usuarios-admin-h',
  templateUrl: './usuarios-admin-h.component.html',
  styleUrls: ['./usuarios-admin-h.component.css']
})
export class UsuariosAdminHComponent implements OnInit {
  hotels: any;
  hotel: ReservationModel;
  constructor(
    private hotelRest: HotelRestService
  ) {
    this.hotel = new ReservationModel ('', '', new Date(), 0, 0, '', [], [], 0)
   }

  ngOnInit(): void {
    this.getUsersByHotel();
  }
  getUsersByHotel(){
    this.hotelRest.getUserAdmin().subscribe({
      next:(res:any)=>{
        this.hotels = res.users;
        console.log(this.hotels)
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };
  getUserAdmin(){
    this.hotelRest.getUserAdmin().subscribe({
      next: (res:any)=> {this.hotel = res.users},
      error: (err)=> alert(err.error.message)
    })
  }
}
