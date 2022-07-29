import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotels.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserAdminService } from 'src/app/services/userAdmin/user-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels-admin',
  templateUrl: './hotels-admin.component.html',
  styleUrls: ['./hotels-admin.component.css']
})
export class HotelsAdminComponent implements OnInit {
  hotels: any =[] ;
  hotel: HotelModel;
  userA:any=[];
  search: any;
  searchD: any;

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
  saveHotels(addHotelsForm: any){
    this.hotelRest.saveHotels(this.hotel).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addHotelsForm.reset();
        this.getHotels();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
        addHotelsForm.reset();
      }
    })
  };
}

