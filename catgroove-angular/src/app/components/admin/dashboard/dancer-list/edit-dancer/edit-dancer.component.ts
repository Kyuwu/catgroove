import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Dancer from 'src/app/shared/services/dancer';

@Component({
  selector: 'app-edit-dancer',
  templateUrl: './edit-dancer.component.html',
  styleUrls: ['./edit-dancer.component.scss']
})
export class EditDancerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // deleteTutorial() {
  //   this.db.delete(this.currentTutorial.key)
  //     .then(() => {
  //       this.refreshList.emit();
  //       this.message = 'The tutorial was updated successfully!';
  //     })
  //     .catch(err => console.log(err));
  // }

}
