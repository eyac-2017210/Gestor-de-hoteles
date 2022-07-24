import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private userRest: UserRestService,
    private http: HttpClient
  ) { }
  getUsers(){
    return this.http.get(environment.baseUrl + 'user/getUsers', {headers:this.httpOptions});
  };
  getUserId(id:string){
    return this.http.get(environment.baseUrl + 'user/getUserId/'+ id, {headers: this.httpOptions});
  }
  deleteUserA(id:string){
    return this.http.delete(environment.baseUrl + 'user/deleteUserByAdmin/' + id, {headers:this.httpOptions});
  }
  saveAdminHotel(params:{}){
    return this.http.post(environment.baseUrl + 'user/saveAdminHotel',params,{headers:this.httpOptions});
  }
  updateuserAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'user/updateUserByAdmin/'+id,params,{headers:this.httpOptions});
  }
}
