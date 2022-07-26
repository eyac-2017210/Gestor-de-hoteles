import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private userRest: UserRestService,
    private http: HttpClient
  ) { }
  
  getHotels(){
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {headers:this.httOptions});
  };

  getHotelByAdmin(){
    return this.http.get(environment.baseUrl + 'hotel/getHotelByAdmin', {headers:this.httOptions});
  };
  getUserAdmin(){
    return this.http.get(environment.baseUrl + 'hotel/getUserByHotel', {headers:this.httOptions});
  };

  getHotel(id:string){
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id, {headers:this.httOptions});
  }

  saveHotels(params:{}){
    return this.http.post(environment.baseUrl + 'hotel/saveHotel',params, {headers:this.httOptions});
  }
  updateHotel(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'hotel/updateHotel/' + id, params, {headers: this.httOptions})
  }
}
