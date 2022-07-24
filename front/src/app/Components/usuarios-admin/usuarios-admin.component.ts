import { Component, OnInit } from '@angular/core';
import { UserAdminService } from 'src/app/services/userAdmin/user-admin.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  user: any=[];
  userM: UserModel;
  userUpdate={
    _id:"",name:"",surname:"",username:"",email:"",phone:""
  }

  constructor(
    private userARest: UserAdminService,
  ) {
    this.userM = new UserModel('', '', '', '', '', '','','');
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userARest.getUsers().subscribe({
      next:(res:any)=>{
        this.user= res.users;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  saveAdminHotel(){
    this.userARest.saveAdminHotel(this.userM).subscribe({
      next: (res:any)=>{alert(res.message);
      this.getUsers();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }
  getUserId(idUsers:any){
    this.userARest.getUserId(idUsers).subscribe({
      next: (res:any)=> {
        this.userUpdate._id = res.usersA._id;
        this.userUpdate.name = res.usersA.name;
        this.userUpdate.surname = res.usersA.surname;
        this.userUpdate.username= res.usersA.username;
        this.userUpdate.email = res.usersA.email;
        this.userUpdate.phone= res.usersA.phone;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }
  updateuserAdmin(){
    this.userARest.updateuserAdmin(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getUsers();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }
  deleteUserA(idUser:any){
    this.userARest.deleteUserA(idUser).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getUsers();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
}
