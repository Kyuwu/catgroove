import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Theme from '../../models/theme';
import { FileuploadService } from '../fileupload.service';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private dbPath = '/theme';

  apiRef: AngularFireList<Theme>;
  constructor(db: AngularFireDatabase, public upload: FileuploadService) {
    this.apiRef = db.list(this.dbPath);
  }

  create(any: any): any {
    this.apiRef.push(any.value)
  }

  update(key: string, value: any): Observable<number> {
    this.upload.setPath(this.dbPath);
    return this.upload.push(value, key);
  }

  delete(key: string, name: string): Promise<void>  {
    this.upload.setPath(this.dbPath);
    return this.upload.delete(key, name);
  }
  getAll(): AngularFireList<Theme> {
    return this.apiRef;
  }
}