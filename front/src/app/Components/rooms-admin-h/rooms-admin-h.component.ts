import { Component, OnInit } from '@angular/core';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';
import { RoomModel } from 'src/app/models/room.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms-admin-h',
  templateUrl: './rooms-admin-h.component.html',
  styleUrls: ['./rooms-admin-h.component.css']
})
export class RoomsAdminHComponent implements OnInit {
  room: RoomModel;
  rooms: any;
  role: String = '';
  id : any;
  roomUpdate = {
    _id: "", type:"", available:"", price: ""
  }
  
  constructor(
    private roomRest : RoomRestService
  ) { this.room = new RoomModel ('', '', 0, 0, '')
    }

  ngOnInit(): void {
    this.getRoomsByHotel()
    
  }


  getRoomsByHotel(){
    this.roomRest.getRoomAdmin().subscribe({
      next:(res:any)=>{
        this.rooms = res.rooms
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getRoom(idRoom:any){
    this.roomRest.getRoom(idRoom).subscribe({
      next: (res:any)=> {
        this.roomUpdate._id = res.room._id;
        this.roomUpdate.type = res.room.type;
        this.roomUpdate.available = res.room.available;
        this.roomUpdate.price= res.room.price;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }



  getRoomAdmin(){
    this.roomRest.getRoomAdmin().subscribe({
      next: (res:any)=> {this.room = res.room;},
      error: (err)=> alert(err.error.message)
    })
  }

  saveRoom(addRoomsForm: any){
    this.roomRest.saveRoom(this.room).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        addRoomsForm.reset();
        this.getRoomsByHotel();
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


    updateRoom(){
      this.roomRest.updateRoom(this.roomUpdate._id, this.roomUpdate).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: res.message ,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position:'center'
          })
          this.getRoomsByHotel();
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
    

    deleteRoom(idRoom:any){
      this.roomRest.deleteRoom(idRoom).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: res.message ,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position:'center'
          })
          this.getRoomsByHotel();
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