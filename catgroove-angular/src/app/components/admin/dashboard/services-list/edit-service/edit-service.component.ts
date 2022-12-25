import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import Management from 'src/app/shared/models/management';
import { ServicesService } from 'src/app/shared/services/firebase/services.service';
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

  constructor(public fb: FormBuilder, public db: ServicesService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.add = this.fb.group({
      image: [data.image, Validators.required],
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      reminder: [data.reminder, Validators.required],
      price: [data.price, Validators.required],
      minutes: [data.minutes, Validators.required],
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
