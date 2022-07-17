import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';

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

  constructor(
    public activateRoute : ActivatedRoute,
    public roomRest: RoomRestService
  ) { 
    this.room = new RoomModel('', '', 0, 0, '');
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.id =idH.get('id');
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

}
