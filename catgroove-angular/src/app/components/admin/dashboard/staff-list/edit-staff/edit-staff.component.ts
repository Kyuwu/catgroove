import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { map } from 'rxjs';
import Club from 'src/app/shared/models/club';
import Staff from 'src/app/shared/models/staff';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  type = "Staff";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  clubs: Club[];
  data: Staff;

  constructor(public fb: FormBuilder, public db: StaffService, public club: ClubService, public snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.clubs = club.getClubs();
    this.add = this.fb.group({
      club: [data.club, Validators.required],
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
