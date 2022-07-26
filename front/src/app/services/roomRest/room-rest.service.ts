import { Injectable } from '@angular/core';
import { UserRestService } from '../user-rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService,) { }
    
    getRoomsById(id: string){
      return this.http.get(environment.baseUrl + 'room/getRoomsById/' + id, {headers:this.httOptions})
    }

    getRoom(id: string){
      return this.http.get(environment.baseUrl + 'room/getRoom/' + id, {headers:this.httOptions});
    };

    getRoomAdmin(){
      return this.http.get(environment.baseUrl + 'room/getRoomsByHotel', {headers:this.httOptions});
    };
    saveRoom(params:{}){
      return this.http.post(environment.baseUrl + 'room/saveRoom/', params, {headers:this.httOptions});
    };

    updateRoom(id:string, params:{}){
      return this.http.put(environment.baseUrl + 'room/updateRoom/' + id, params, {headers: this.httOptions})
    }

    deleteRoom(id: string){
      return this.http.delete(environment.baseUrl + 'room/deleteRoom/' + id, {headers:this.httOptions});
    };
}
