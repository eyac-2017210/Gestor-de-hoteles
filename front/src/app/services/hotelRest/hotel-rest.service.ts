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
  saveHotels(params:{}){
    return this.http.post(environment.baseUrl + 'hotel/saveHotel',params, {headers:this.httOptions});
  }
}
