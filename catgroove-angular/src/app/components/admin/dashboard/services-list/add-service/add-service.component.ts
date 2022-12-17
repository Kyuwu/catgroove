import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services/firebase/services.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  type = 'Service';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  constructor(public fb: FormBuilder, public db: ServicesService) {     
    this.add = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      reminder: ['', Validators.required],
      price: ['', Validators.required],
      minutes: ['', Validators.required],
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
