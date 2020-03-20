import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase'; 
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user: firebase.User) {
    debugger

    this.db.object('/user/' + user.uid).update({

      name: user.displayName,
      email: user.email
    })
    .then(res => console.log('Done Saving To DB'))
    .catch(err => console.log(err)
    )
  }

  get(uid: string) : FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' +uid);

  }

}
