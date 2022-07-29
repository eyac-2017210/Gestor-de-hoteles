import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
  ) { 
    this.user= new UserModel('', '', '', '', '', '','','');
  }

  ngOnInit(): void {
  }
  saveUser(register:any){
    this.userRest.getRegisterUser(this.user).subscribe({
      next: (res: any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        return this.router.navigateByUrl('/login')
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  }
}
