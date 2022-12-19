import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import Theme from 'src/app/shared/models/theme';
import { ThemeService } from 'src/app/shared/services/firebase/theme.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  
  add: FormGroup;
  key: string;
  data: Theme = new Theme();
  selectedFile!: ImageSnippet;

  constructor(private db: ThemeService, public snackbar: SnackbarService, public fb: FormBuilder) {    
    this.add = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.retrieveList();
  }

  refreshList(): void {
    this.retrieveList();
  }

  retrieveList(): void {
    this.db.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      console.log(data[0])
      this.add.controls['name'].setValue(data[0].name);
      this.add.controls['description'].setValue(data[0].description);
      this.add.controls['image'].setValue(data[0].image);
      this.data = data[0];
    });
  }

  submit() {
    this.db.update(this.data.key, this.add.value);
    this.snackbar.update(`Updated the current theme: ${this.data.name}`,'');
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.add.controls['image'].setValue(this.selectedFile.src);
    });
    reader.readAsDataURL(file);
  }
}
