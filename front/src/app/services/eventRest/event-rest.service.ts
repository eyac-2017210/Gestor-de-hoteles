import { Injectable } from '@angular/core';
import { UserRestService } from '../user-rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService,
  ) { }

  getEventsById(id: string){
    return this.http.get(environment.baseUrl + 'event/getEventsById/' + id, {headers:this.httOptions})
  }

  getEvent(id: string){
    return this.http.get(environment.baseUrl + 'event/getEvent/' + id, {headers:this.httOptions});
  };
  getEventsByAdmin(){
    return this.http.get(environment.baseUrl + 'event/getEventsByHotel', {headers:this.httOptions});
  };

  saveEvent(params:{}){
    return this.http.post(environment.baseUrl + 'event/saveEvent/', params, {headers:this.httOptions});
  };

  updateEvent(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'event/updateEvent/' + id, params, {headers: this.httOptions})
  }

  deleteEvent(id: string){
    return this.http.delete(environment.baseUrl + 'event/deleteEvent/' + id, {headers:this.httOptions});
  };

}
