import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Management from '../../models/management';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private dbPath = '/managementTEST';

  apiRef: AngularFireList<Management>;

  constructor(db: AngularFireDatabase) {
    this.apiRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Management> {
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
}