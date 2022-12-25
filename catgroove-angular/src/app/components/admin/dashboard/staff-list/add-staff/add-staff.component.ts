import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { map } from 'rxjs';
import Club from 'src/app/shared/models/club';
import Staff from 'src/app/shared/models/staff';
import { ClubService } from 'src/app/shared/services/firebase/club.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  type = 'Staff';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  clubs: Club[];
  staff: Staff;
  constructor(public fb: FormBuilder, public db: StaffService, public club: ClubService) {   
    this.clubs = club.getClubs();  
    this.add = this.fb.group({
      image: ['', Validators.required],
      club: ['', Validators.required],
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
