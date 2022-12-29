import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import {
  AngularFireStorage
} from '@angular/fire/compat/storage';
import {
  Form,
  FormGroup
} from '@angular/forms';
import { base64ToFile } from 'ngx-image-cropper';

import {
  Observable
} from 'rxjs';
import {
  finalize
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private basePath = '';


  setPath(string: string) {
    this.basePath = string;
  }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  push(form: FormGroup, key?: string, base?: boolean): Observable < number > {
    const filePath = `${this.basePath}/${form.controls['name'].value}`;
    if (form.controls['image']) {
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, base64ToFile(form.controls['image'].value));
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            form.controls['image'].setValue(downloadURL);
            if (typeof key !== 'undefined') {
              this.update(key, form);
            } else {
              this.save(form);
            }
          });
        })
      ).subscribe();
      return uploadTask.percentageChanges();
    } else {
      this.update(key, form);
      return null;
    }
  }

  private save(form: FormGroup): void {
    this.db.list(this.basePath).push(form.value);
  }

  private update(key: string, form: FormGroup): void {
    this.db.list(this.basePath).update(key,form.value);
  }

  delete(key: string, name: string)  {
    return this.deleteFileDatabase(key)
      .then(() => {
        this.deleteFileStorage(name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise < void > {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
