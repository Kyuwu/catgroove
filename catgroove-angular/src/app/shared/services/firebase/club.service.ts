import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import Club from '../../models/club';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private dbPath = '/clubs';
  private clubs: Club[];
  apiRef: AngularFireList<Club>;

  constructor(db: AngularFireDatabase, public upload: FileuploadService) {
    this.apiRef = db.list(this.dbPath);
  }

  create(any: any): any {
    this.upload.setPath(this.dbPath);
    return this.upload.push(any);
  }

  update(key: string, value: any): Observable<number> {
    this.upload.setPath(this.dbPath);
    return this.upload.push(value, key);
  }

  delete(key: string, name: string): Promise<void>  {
    this.upload.setPath(this.dbPath);
    return this.upload.delete(key, name);
  }

  getAll(): AngularFireList<Club> {
    return this.apiRef;
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

}