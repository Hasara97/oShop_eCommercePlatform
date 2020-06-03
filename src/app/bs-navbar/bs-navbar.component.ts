import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { User, app } from 'firebase';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser: any; 
 
  constructor(private auth: AuthService) {
     

   }

   ngOnInit(){
     this.auth.appUser$.subscribe(appUser => {
      console.log(appUser);
      this.appUser = appUser;
    });
   }

 logout() {
   this.auth.logout();
 }

}
 