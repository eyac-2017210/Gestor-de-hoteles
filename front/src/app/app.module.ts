import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { EventsComponent } from './Components/events/events.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { HotelsComponent } from './Components/hotels/hotels.component';
import { HotelsAdminComponent } from './Components/hotels-admin/hotels-admin.component';
import { HotelsAdminHComponent } from './Components/hotels-admin-h/hotels-admin-h.component';
import { RoomsAdminHComponent } from './Components/rooms-admin-h/rooms-admin-h.component';
import { EventsAdminHComponent } from './Components/events-admin-h/events-admin-h.component';
import { UsuariosAdminHComponent } from './Components/usuarios-admin-h/usuarios-admin-h.component';
import { UsuariosAdminComponent } from './Components/usuarios-admin/usuarios-admin.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { SearchHotelByNamePipe } from './pipes/search-hotel-by-name.pipe';
import { SearchHotelByDirectionPipe } from './pipes/search-hotel-by-direction.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    EventsComponent,
    ReservationComponent,
    RoomsComponent,
    HotelsComponent,
    HotelsAdminComponent,
    HotelsAdminHComponent,
    RoomsAdminHComponent,
    EventsAdminHComponent,
    UsuariosAdminHComponent,
    UsuariosAdminComponent,
    InvoicesComponent,
    SearchHotelByNamePipe,
    SearchHotelByDirectionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
