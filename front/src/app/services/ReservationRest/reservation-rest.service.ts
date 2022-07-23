import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationRestService {

  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  }) 

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) {  }

  addRoomToReservation(id:string, params:{}){
    return this.http.post(environment.baseUrl + 'reservation/addRoomToReservation/' + id, params, {headers:this.httOptions});
   };

   addEventsToReservation(id:string, params:{}){
    return this.http.post(environment.baseUrl + 'reservation/addEventsToReservation/' + id, params,{headers:this.httOptions});
   };

   getReservation(){
    return this.http.get(environment.baseUrl + 'reservation/getReservation', {headers:this.httOptions});
  };

  cancelReservation(){
    return this.http.delete(environment.baseUrl + 'reservation/cancelReservation' , {headers:this.httOptions});
   };

   payReservation(params:any){
    let body = JSON.stringify({'pay':params})
    return this.http.post(environment.baseUrl + 'reservation/payReservation' , body, {headers:this.httOptions});
   };
    

}
