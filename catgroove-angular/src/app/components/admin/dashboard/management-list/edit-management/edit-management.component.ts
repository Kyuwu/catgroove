import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Management from 'src/app/shared/models/management';
import { ManagementService } from 'src/app/shared/services/firebase/management.service';
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

  constructor(public fb: FormBuilder, public db: ManagementService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      image: [data.image, Validators.required],
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
    this.db.update(this.data.key, this.add);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.add.controls['image'].setValue(this.selectedFile.file);
    });
    reader.readAsDataURL(file);
  }
}
