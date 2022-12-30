import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  ImageCroppedEvent,
  LoadedImage
} from 'ngx-image-cropper';
import {
  map
} from 'rxjs';
import Club from 'src/app/shared/models/club';
import Theme from 'src/app/shared/models/theme';
import {
  ClubService
} from 'src/app/shared/services/firebase/club.service';
import {
  ThemeService
} from 'src/app/shared/services/firebase/theme.service';
import {
  SnackbarService
} from 'src/app/shared/services/snackbar.service';
import { ClubListService } from 'src/app/shared/util/clublist/clublist.service';
import {
  ImageSnippet
} from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  clubs: Club[];
  add: FormGroup;
  key: string;
  data: Theme = new Theme();
  selectedFile!: ImageSnippet;

  constructor(private db: ThemeService, private club: ClubListService, public snackbar: SnackbarService, public fb: FormBuilder, public snack: SnackbarService) {
    this.clubs = club.setClubs();
    this.add = this.fb.group({
      name: [, Validators.required],
      description: ['test', Validators.required],
      location: ['test'],
    });
  }

  ngOnInit(): void {
    // this.clubs = this.club.getClubsCall();
    this.retrieveList();
  }

  get() {
    // this.clubs = this.club.getClubs();
  }
  retrieveList(): void {
    this.db.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      )
    ).subscribe(data => {
      this.add.controls['name'].setValue(data[0].name);
      this.add.controls['description'].setValue(data[0].description);
      // this.add.controls['image'].setValue(data[0].image);
      this.add.controls['location'].setValue(data[0].location);
      this.data = data[0];
      console.log(this.data)

    });
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  submit() {
    this.db.update(this.data.key, this.add);
    this.snackbar.update(`Updated the current theme: ${this.data.name} to ${this.add.controls['name'].value}`, '');
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
    this.snack.add("image loaded", '')
  }
  cropperReady() {
    // cropper ready
    this.snack.add("image ready", '')
  }
}
