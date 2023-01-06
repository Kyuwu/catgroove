import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-custom-material',
  templateUrl: './custom-material.component.html',
  styleUrls: ['./custom-material.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomMaterialComponent {
  @Input() model: FormControl;
  @Input() values = [];
  @Input() text = 'Select All'; 

  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }

  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
      && this.model.value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.patchValue(this.values);
    } else {
      this.model.patchValue([]);
    }
  }
}
