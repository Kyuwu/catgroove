import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DancerService } from 'src/app/shared/services/dancer.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-dancer',
  templateUrl: './add-dancer.component.html',
  styleUrls: ['./add-dancer.component.scss']
})

export class AddDancerComponent implements OnInit {
  selectedFile!: ImageSnippet;
  add: FormGroup;
  constructor(private matDialog: MatDialog,  public fb: FormBuilder, public db: DancerService) {     
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      language: ['', Validators.required],
      nsfw: ['', Validators.required],
      orientation: ['', Validators.required],
      pref: ['', Validators.required],
      services: ['', Validators.required],
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

