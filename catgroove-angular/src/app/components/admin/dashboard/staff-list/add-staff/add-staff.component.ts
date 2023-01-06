import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Club from 'src/app/shared/models/club';
import Staff from 'src/app/shared/models/staff';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  type = 'Staff';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  clubs: Club[];
  staff: Staff;
  constructor(public fb: FormBuilder, public db: StaffService, public club: ClubService, public snack: SnackbarService) {   
    this.clubs = club.getClubs();  
    this.add = this.fb.group({
      image: ['', Validators.required],
      club: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      bio: ['', Validators.required],
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
