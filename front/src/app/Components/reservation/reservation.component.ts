import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationModel } from 'src/app/models/reservation.model';
import { ReservationRestService } from 'src/app/services/ReservationRest/reservation-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation: ReservationModel;
  ruta: any;
  role: any;
  reservations: any;
  idReserv: any;
  pay: number = 0;

  constructor(
    public userRest: UserRestService,
    public reservationRest: ReservationRestService,
    public activateRoute: ActivatedRoute
  ) {
    this.reservation = new ReservationModel('', '', new Date(), 0, 0, '', [], [], 0);
   }

  ngOnInit(): void {
    
    this.role = this.userRest.getIdentity().role;
    this.getReservation();
    
  }

  getReservation(){
    this.reservationRest.getReservation().subscribe({
      next:(res:any)=>{
        this.reservations= res.reserExist;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  cancelReservation(){
    this.reservationRest.cancelReservation().subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getReservation();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  payReservation(addPayForm:any){
    this.reservationRest.payReservation(this.pay).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addPayForm.reset();
        this.getReservation();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

}
