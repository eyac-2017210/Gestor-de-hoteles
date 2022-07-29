import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events-admin-h',
  templateUrl: './events-admin-h.component.html',
  styleUrls: ['./events-admin-h.component.css']
})
export class EventsAdminHComponent implements OnInit {

  events: any =[] ;
  event: EventModel;
  hotelH:any=[];
  updateEvent = {
    _id: "", name:"", price:"", description:""
  }

  constructor(
    private eventRest: EventRestService
  ) { 
    this.event = new EventModel('', '', 0, '', '');
  }

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(){
    this.eventRest.getEventsByAdmin().subscribe({
      next:(res:any)=>{
        this.events= res.events;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  getEventsById(idEvent:any){
    this.eventRest.getEvent(idEvent).subscribe({
      next: (res:any)=> {
        this.updateEvent._id = res.event._id;
        this.updateEvent.name = res.event.name;
        this.updateEvent.price = res.event.price;
        this.updateEvent.description= res.event.description;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  saveEvent(addRoomsForm: any){
    this.eventRest.saveEvent(this.event).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addRoomsForm.reset();
        this.getEvents();
      },
      error:(err)=>{
        Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
        })
        addRoomsForm.reset();
      }
    })
  };

  eventUpdate(){
    this.eventRest.updateEvent(this.updateEvent._id, this.updateEvent).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents();
      },
      error:(err)=>{
        Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
        })
      }
    })
  };

  deleteEvent(idEvent:any){
    this.eventRest.deleteEvent(idEvent).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents();
      },
      error:(err)=>{
        Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
        })
      }
    })
  };
}
