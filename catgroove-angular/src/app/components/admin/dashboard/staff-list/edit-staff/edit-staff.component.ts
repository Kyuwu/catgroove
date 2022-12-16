import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Staff from 'src/app/shared/models/staff';
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
  data: Staff;

  constructor(public fb: FormBuilder, public db: StaffService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      image: [data.image, Validators.required],
      name: [data.name, Validators.required],
      role: [data.role, Validators.required],
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
