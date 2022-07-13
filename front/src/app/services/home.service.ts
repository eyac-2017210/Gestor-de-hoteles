import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { UserRestService } from './user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }
  
  getHotels(){
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {headers: this.httpOptions});
  }
}
