import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Service from '../../models/service';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private dbPath = '/services';

  apiRef: AngularFireList<Service>;
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

  getAll(): AngularFireList<Service> {
    return this.apiRef;
  }
}
