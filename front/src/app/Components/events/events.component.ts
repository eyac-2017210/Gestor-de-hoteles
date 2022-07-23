import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { ReservationModel } from 'src/app/models/reservation.model';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';
import { ReservationRestService } from 'src/app/services/ReservationRest/reservation-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any;
  event: EventModel;
  eventUpdate: any = [];
  id : any;
  role: any;
  ruta: any;
  reservation: ReservationModel;

  constructor(
    public activateRoute : ActivatedRoute,
    public eventRest: EventRestService,
    public userRest: UserRestService,
    public router: Router,
    public reservationRest: ReservationRestService
  ) { 
    this.event = new EventModel('', '', 0, '', '');
    this.reservation = new ReservationModel('', '', new Date(), 0, 0, '', [], [], 0);
  }

  ngOnInit(): void {
    
    this.activateRoute.paramMap.subscribe((idH:any)=>{
    this.id =idH.get('id');
    this.role = this.userRest.getIdentity().role;
    });
    this.getEventsById();
    
  }
  getEventsById(){
    this.eventRest.getEventsById(this.id).subscribe({
      next:(res:any)=>{
        this.events = res.events
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getEvent(id: string){
    this.eventRest.getEvent(id).subscribe({
      next:(res:any)=>{this.eventUpdate= res.event},
      error:(err)=>{alert(err.error.message)}

    })
  };

  addEventsToReservation(addEventForm:any){
    this.reservationRest.addEventsToReservation(this.eventUpdate._id, this.reservation).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addEventForm.reset();
      this.router.navigateByUrl('/reservation');
      },
      error:(err)=> alert(err.error.message || err.error)
    })
  };
  

}
