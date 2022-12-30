import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Bar from 'src/app/shared/models/bar';
import { BarService } from 'src/app/shared/services/firebase/bar.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit {
  type = "Recipe";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  data: Bar;
  constructor(public fb: FormBuilder, public snack: SnackbarService, public db: BarService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      recipe: [data.recipe, Validators.required],
      price: [data.price, Validators.required],
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
