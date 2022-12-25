import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import Dancer from 'src/app/shared/models/dancer';
import {
  DancerService
} from 'src/app/shared/services/firebase/dancer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import {
  ImageSnippet
} from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-edit-dancer',
  templateUrl: './edit-dancer.component.html',
  styleUrls: ['./edit-dancer.component.scss']
})
export class EditDancerComponent implements OnInit {
  type = "Dancer";
  selectedFile!: ImageSnippet;
  add: FormGroup;
  data: Dancer;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  ogImage: any = '';

  constructor(public fb: FormBuilder, public snack: SnackbarService, public db: DancerService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
      image: [data.image, Validators.required],
      name: [data.name, Validators.required],
      age: [data.age, Validators.required],
      language: [data.language, Validators.required],
      nsfw: [data.nsfw, Validators.required],
      orientation: [data.orientation, Validators.required],
      pref: [data.pref, Validators.required],
      services: [data.services, Validators.required],
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.snack.update("image cropped",'')
    this.add.controls['image'].setValue(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
      this.snack.add("image loaded",'')
      this.add.controls['imageLoaded'].setValue(image);
  }
  cropperReady() {
    // cropper ready
    this.snack.add("image ready",'')
  }
}
