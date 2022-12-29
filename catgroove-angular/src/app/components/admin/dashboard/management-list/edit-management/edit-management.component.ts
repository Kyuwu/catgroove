import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Management from 'src/app/shared/models/management';
import { ManagementService } from 'src/app/shared/services/firebase/management.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-management',
  templateUrl: './edit-management.component.html',
  styleUrls: ['./edit-management.component.scss']
})
export class EditManagementComponent implements OnInit {
  type = "Management";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  data: Management;

  constructor(public fb: FormBuilder, public db: ManagementService, public snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      name: [data.name, Validators.required],
      role: [data.role, Validators.required],
      bio: [data.bio, Validators.required],
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
