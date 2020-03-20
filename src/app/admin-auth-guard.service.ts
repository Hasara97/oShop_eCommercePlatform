import { Injectable, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';






@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    

     .map(AppUser=> AppUser.isAdmin);

  }
}
