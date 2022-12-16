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
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import Dancer from 'src/app/shared/services/dancer';
import {
  DancerService
} from 'src/app/shared/services/dancer.service';
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
  dancer: Dancer;

  constructor(public fb: FormBuilder, public db: DancerService,
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
    this.dancer = data;
  }

  ngOnInit(): void {
    // console.log(data)
  }
  submit() {
    this.db.update(this.dancer.key, this.add.value);
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
