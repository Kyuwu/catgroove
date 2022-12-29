import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Management from 'src/app/shared/models/management';
import { ServicesService } from 'src/app/shared/services/firebase/services.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  type = "Service";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  data: Management;

  constructor(public fb: FormBuilder, public db: ServicesService, public snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.add = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      reminder: [data.reminder, Validators.required],
      price: [data.price, Validators.required],
      minutes: [data.minutes, Validators.required],
    });
    this.data = data;
  }


  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  ngOnInit(): void {}
  submit() {
    this.db.update(this.data.key, this.add);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.add.addControl('image', new FormControl(this.croppedImage, Validators.required));
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
