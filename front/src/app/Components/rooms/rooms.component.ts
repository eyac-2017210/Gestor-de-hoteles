import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { ReservationRestService } from 'src/app/services/ReservationRest/reservation-rest.service';
import Swal from 'sweetalert2';
import { ReservationModel } from 'src/app/models/reservation.model';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any;
  room: RoomModel;
  roomUpdate: any = [];
  id : any;
  role:any;
  ruta:any;
  idReserv: any;
  reservation: ReservationModel;

  constructor(
    public activateRoute : ActivatedRoute,
    public roomRest: RoomRestService,
    public reservationRest: ReservationRestService,
    public userRest: UserRestService,
    public router: Router
  ) { 
    this.room = new RoomModel('', '', 0, 0, '');
    this.reservation = new ReservationModel('', '', new Date(), 0, 0, '', [], [], 0);
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.id =idH.get('id');
      this.role = this.userRest.getIdentity().role;
    });

    this.getRoomsById()
  }

  getRoomsById(){
    this.roomRest.getRoomsById(this.id).subscribe({
      next:(res:any)=>{
        this.rooms = res.rooms
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getRoom(id: string){
    this.roomRest.getRoom(id).subscribe({
      next:(res:any)=>{this.roomUpdate= res.room},
      error:(err)=>{alert(err.error.message)}

    })
  };

  addRoomToReservation(addReservationForm:any){
    this.reservationRest.addRoomToReservation(this.roomUpdate._id, this.reservation).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
      addReservationForm.reset();
      this.router.navigateByUrl('/events/' + this.id);
      },
      error:(err)=>{
        Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
        })
        addReservationForm.reset();
      }
    })
  };
  


}
