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
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
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
  constructor(public fb: FormBuilder, public snack: SnackbarService, public db: DancerService,
    @Inject(MAT_DIALOG_DATA) data) {
    // this.dialogRef = this.matDialog.open(AddDancerComponent);
    this.add = this.fb.group({
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
