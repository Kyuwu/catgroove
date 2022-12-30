import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Dancer from '../../models/dancer';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class DancerService {
  private dbPath = '/dancers';

  apiRef: AngularFireList<Dancer>;

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
  
  getAll(): AngularFireList<Dancer> {
    return this.apiRef;
  }
}