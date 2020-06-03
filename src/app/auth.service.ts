import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { SnapshotAction } from '@angular/fire/database';


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

  get appUser$() : Observable<AppUser>|Observable<any>{

    return this.user$.switchMap((user,index) => {
      if(user) 
      return this.userService.get(user.uid).valueChanges();

      return Observable.of(null);
    })

  }

}
