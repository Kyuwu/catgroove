import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DancerService } from 'src/app/shared/services/firebase/dancer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-dancer',
  templateUrl: './add-dancer.component.html',
  styleUrls: ['./add-dancer.component.scss']
})

export class AddDancerComponent implements OnInit {
  type = 'Dancer';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  ogImage: any = '';
  constructor(public fb: FormBuilder, public db: DancerService, public snack: SnackbarService) {     
    this.add = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      language: ['', Validators.required],
      nsfw: ['', Validators.required],
      orientation: ['', Validators.required],
      pref: ['', Validators.required],
      services: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  submit() {
    this.db.create(this.add.value);
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.snack.update("image cropped",'')
      this.add.controls['image'].setValue(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
      this.snack.add("image loaded",'')
  }
  cropperReady() {
    // cropper ready
    this.snack.add("image ready",'')
  }

}

