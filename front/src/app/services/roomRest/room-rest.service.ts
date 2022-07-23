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
}
