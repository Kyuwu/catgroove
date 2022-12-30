import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import Club from '../../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubListService {
  private dbPath = '/clubs';
  apiRef: AngularFireList<Club>;
  private clubs: Club[];
  constructor(db: AngularFireDatabase) {
    this.apiRef = db.list(this.dbPath);
  }

  setClubs() {
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
    return this.clubs;
  }

  getAll(): AngularFireList<Club> {
    return this.apiRef;
  }
}