import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Staff from '../../models/staff';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private dbPath = '/staff';

  apiRef: AngularFireList<Staff>;
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

  getAll(): AngularFireList<Staff> {
    return this.apiRef;
  }
}