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
    upload.setPath(this.dbPath);
  }

  create(any: any): any {
    return this.upload.push(any);
  }

  update(key: string, value: any): Observable<number> {
    return this.upload.push(value, key);
  }

  delete(key: string, name: string): Promise<void>  {
    return this.upload.delete(key, name);
  }

  getAll(): AngularFireList<Staff> {
    return this.apiRef;
  }
}