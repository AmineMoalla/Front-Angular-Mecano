import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeComponent } from './employe/employe.component';
import { ReparationComponent } from './reparation/reparation.component';
import { PieceComponent } from './piece/piece.component';
import { MatIconModule } from '@angular/material/icon';
import { ClientComponent } from './client/client.component';
import { VoitureComponent } from './voiture/voiture.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
 

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EmployeComponent,
    PieceComponent,
    ReparationComponent,
    ClientComponent,
    VoitureComponent,
    HomeComponent,
    NavbarComponent,
   

   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
