import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import Club from 'src/app/shared/models/club';
import Staff from 'src/app/shared/models/staff';
import {
  ClubService
} from 'src/app/shared/services/firebase/club.service';
import {
  StaffService
} from 'src/app/shared/services/firebase/staff.service';
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

  constructor(public fb: FormBuilder, public db: ClubService) {
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

    ngOnInit(): void {}
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
