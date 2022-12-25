import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { map } from 'rxjs';
import Club from 'src/app/shared/models/club';
import Staff from 'src/app/shared/models/staff';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
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

  constructor(public fb: FormBuilder, public db: StaffService, public club: ClubService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.clubs = club.getClubs();
    this.add = this.fb.group({
      image: [data.image, Validators.required],
      club: [data.club, Validators.required],
      name: [data.name, Validators.required],
      role: [data.role, Validators.required],
      bio: [data.bio, Validators.required],
    });
    this.data = data;
  }

  ngOnInit(): void {
    // console.log(data)
  }
  submit() {
    this.db.update(this.data.key, this.add.value);
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
