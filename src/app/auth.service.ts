import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 
import { Observable, observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$ : Observable<firebase.User>;
  auth: any;
  constructor(private userService : UserService,
    private afAuth : AngularFireAuth, private route: ActivatedRoute, private userSrvc:UserService) {
    this.user$= afAuth.authState;
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout(){

    this.afAuth.auth.signOut();

  }

  get appUser$() : Observable<AppUser>{

    return this.user$
     .switchMap(user =>  {

      if(user) return this.userService.get(user.uid);

      return Observable.of(null);

     });
  }

}
