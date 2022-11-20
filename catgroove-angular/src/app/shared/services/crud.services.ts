import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Dancer } from './dancer';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  dancersRef!: AngularFireList<any>;
  dancerRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Dancer
  AddDancer(dancer: Dancer) {
    this.dancersRef.push({
      name: dancer.name,
      age: dancer.age,
      language: dancer.language,
      nsfw: dancer.nsfw,
      orientation: dancer.orientation,
      pref: dancer.pref,
      services: dancer.services,
      bio: dancer.bio
    });
  }
  // Fetch Single Dancer Object
  GetDancer(id: string) {
    this.dancerRef = this.db.object('dancers-list/' + id);
    return this.dancerRef;
  }
  // Fetch Dancers List
  GetDancersList() {
    this.dancersRef = this.db.list('dancers-list');
    return this.dancersRef;
  }
  // Update Dancer Object
  UpdateDancer(dancer: Dancer) {
    this.dancerRef.update({
        name: dancer.name,
        age: dancer.age,
        language: dancer.language,
        nsfw: dancer.nsfw,
        orientation: dancer.orientation,
        pref: dancer.pref,
        services: dancer.services,
        bio: dancer.bio
    });
  }
  // Delete Dancer Object
  DeleteDancer(id: string) {
    this.dancerRef = this.db.object('dancers-list/' + id);
    this.dancerRef.remove();
  }
}