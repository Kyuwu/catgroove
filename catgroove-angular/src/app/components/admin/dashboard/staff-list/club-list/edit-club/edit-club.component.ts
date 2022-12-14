import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Club from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { areas, datacenters } from 'src/app/shared/services/staticdata';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent {
  type = "Club";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  data: Club;
  areas = areas;
  datacenters = datacenters;

  constructor(public fb: FormBuilder, public db: ClubService, public snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      datacenter: [data.datacenter, Validators.required],
      server: [data.server, Validators.required],
      area: [data.area, Validators.required],
      ward: [data.ward, Validators.required],
      plot: [data.plot, Validators.required],
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
