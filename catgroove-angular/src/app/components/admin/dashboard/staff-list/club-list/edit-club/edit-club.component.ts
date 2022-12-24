import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Club from 'src/app/shared/models/club';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
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

  constructor(public fb: FormBuilder, public db: ClubService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      image: [data.image, Validators.required],
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
