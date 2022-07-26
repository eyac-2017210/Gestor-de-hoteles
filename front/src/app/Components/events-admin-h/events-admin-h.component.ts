import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';

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
      next: (res:any)=>{alert(res.message);
      this.getEvents();
      },
      
      error: (err)=> alert(err.error.message || err.error)
    });
  }

  eventUpdate(){
    this.eventRest.updateEvent(this.updateEvent._id, this.updateEvent).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getEvents();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }

  deleteEvent(idEvent:any){
    this.eventRest.deleteEvent(idEvent).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getEvents();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
}
