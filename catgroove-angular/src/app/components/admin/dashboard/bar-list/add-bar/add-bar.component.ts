import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BarService } from 'src/app/shared/services/firebase/bar.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss']
})
export class AddBarComponent implements OnInit {
  type = 'Recipe';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  constructor(public fb: FormBuilder, public db: BarService, public snack: SnackbarService) {     
    this.add = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      recipe: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  ogImage: any = '';

  ngOnInit(): void {}
  submit() {
    this.db.create(this.add);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.snack.update("image cropped", '')
    this.add.controls['image'].setValue(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
    this.snack.add("image loaded", '')
  }

  cropperReady() {
    // cropper ready
    this.snack.add("image ready", '')
  }
}
