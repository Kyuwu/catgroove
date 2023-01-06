import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {
  ClubService
} from 'src/app/shared/services/firebase/club.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { areas, datacenters } from 'src/app/shared/services/staticdata';
import {
  ImageSnippet
} from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.scss']
})
export class AddClubComponent implements OnInit {

  type = 'Club';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  location: FormGroup;  
  areas = areas;
  datacenters = datacenters;

  constructor(public fb: FormBuilder, public db: ClubService, public snack: SnackbarService) {
    this.add = this.fb.group({
        image: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        datacenter: ['', Validators.required],
        server: ['', Validators.required],
        area: ['', Validators.required],
        ward: ['', Validators.required],
        plot: ['', Validators.required],
      });
    }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    ogImage: any = '';
  
    ngOnInit(): void {}
    submit() {
      this.db.create(this.add);
    }
  
    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.snack.update("image cropped", '')
      this.add.controls['image'].setValue(this.croppedImage);
    }
    imageLoaded(image: LoadedImage) {
      this.snack.add("image loaded", '')
    }
  
    cropperReady() {
      // cropper ready
      this.snack.add("image ready", '')
    }

  }
