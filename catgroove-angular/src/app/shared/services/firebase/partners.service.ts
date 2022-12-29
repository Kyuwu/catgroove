import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Partner from '../../models/partner';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private dbPath = '/partners';

  apiRef: AngularFireList<Partner>;
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

  getAll(): AngularFireList<Partner> {
    return this.apiRef;
  }
}
