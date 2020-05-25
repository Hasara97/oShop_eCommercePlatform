import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  static getCa: any;

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',{
      query: {
        orderByChild : 'name'
      }

    });
    
  }

}
