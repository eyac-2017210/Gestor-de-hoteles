import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  role: String = '';

  constructor(
    public userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.role = this.userRest.getIdentity().role;
  }

  logOut(){
    localStorage.clear();
  }

}
