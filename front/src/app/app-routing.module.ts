import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { HotelsComponent } from './Components/hotels/hotels.component';
import { EventsComponent } from './Components/events/events.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { UsuariosAdminComponent } from './Components/usuarios-admin/usuarios-admin.component';
import { HotelsAdminComponent } from './Components/hotels-admin/hotels-admin.component';
import { RoomsAdminHComponent } from './Components/rooms-admin-h/rooms-admin-h.component';
import { HotelsAdminHComponent } from './Components/hotels-admin-h/hotels-admin-h.component';
import { UsuariosAdminHComponent } from './Components/usuarios-admin-h/usuarios-admin-h.component';
import { EventsAdminHComponent } from './Components/events-admin-h/events-admin-h.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'userA', component: UsuariosAdminComponent},
  {path: 'hotelA', component:HotelsAdminComponent},
  {path: 'events/:id', component: EventsComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'rooms/:id', component: RoomsComponent},
  {path: 'invoices', component: InvoicesComponent},
  {path: 'roomAdminH', component: RoomsAdminHComponent},
  {path: 'hotelesAdminH', component: HotelsAdminHComponent},
  {path: 'eventosAdminH', component: EventsAdminHComponent},
  {path: 'userAdminH', component: UsuariosAdminHComponent},
  {path: '**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
