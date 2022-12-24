import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import Club from '../../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private dbPath = '/club';
  private clubs: Club[];
  apiRef: AngularFireList<Club>;

  constructor(db: AngularFireDatabase) {
    this.apiRef = db.list(this.dbPath);
  }

  getClubs(){
    return this.clubs;
  }
  getClubsCall(){
    this.setClubs();
    return this.clubs;
  }
  setClubs(){
    this.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      this.clubs = data;
    });
  }

  getAll(): AngularFireList<Club> {
    return this.apiRef;
  }

  create(any: any): any {
    return this.apiRef.push(any);
  }

  update(key: string, value: any): Promise<void> {
    return this.apiRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.apiRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.apiRef.remove();
  }

  r
}