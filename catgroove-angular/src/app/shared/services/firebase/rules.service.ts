import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup } from '@angular/forms';
import { base64ToFile } from 'ngx-image-cropper';
import { finalize, Observable } from 'rxjs';
import Rule from '../../models/rule';
import { FileuploadService } from '../fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private dbPath = '/rules';

  apiRef: AngularFireList<Rule>;
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

  getAll(): AngularFireList<Rule> {
    return this.apiRef;
  }
}
