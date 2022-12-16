import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/firebase/staff.service';
import { ConfirmedValidator } from 'src/app/shared/services/validators/confirmed.validator';
import { ImageSnippet } from 'src/app/shared/util/imagesnippet.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  type = 'Staff';
  selectedFile!: ImageSnippet;
  add: FormGroup;
  constructor(public fb: FormBuilder, public db: StaffService,public authService: AuthService) {     
    this.add = this.fb.group({
      userEmail: ['', Validators.required],
      userPwd: ['', Validators.required],
      userPwd2: ['', Validators.required],
    }, { 
      validator: ConfirmedValidator('userPwd', 'userPwd2')
    });
  }
  ngOnInit(): void {
  }

  submit() {
    this.authService.SignUp(this.add.controls['userEmail'].value, this.add.controls['userPwd'].value);
  }
}
