import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';

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

  constructor(
    public activateRoute : ActivatedRoute,
    public eventRest: EventRestService
  ) { 
    this.event = new EventModel('', '', 0, '', '');
  }

  ngOnInit(): void {
    
    this.activateRoute.paramMap.subscribe((idH:any)=>{
    this.id =idH.get('id');
    });
    this.getEventsById()
    
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


}
