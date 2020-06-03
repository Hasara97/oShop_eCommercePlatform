import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app'; 
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user: firebase.User) {

    this.db.object('/user/' + user.uid).update({

      name: user.displayName,
      email: user.email
    })
    .then(res => console.log('Done Saving To DB'))
    .catch(err => console.log(err)
    )
  }

  get(uid: string) : AngularFireObject<AppUser> {
    return this.db.object('/user/' +uid);
  }

}
