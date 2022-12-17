import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagementService } from 'src/app/shared/services/firebase/management.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-management',
  templateUrl: './add-management.component.html',
  styleUrls: ['./add-management.component.scss']
})
export class AddManagementComponent implements OnInit {
  type = 'Management';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  constructor(public fb: FormBuilder, public db: ManagementService) {     
    this.add = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  submit() {
    this.db.create(this.add.value);
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
