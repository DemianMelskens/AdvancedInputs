import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdvancedInputs';

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      number: [{value: 2, disabled: false}],
      vector2d: [{value: {x: 15, y: 8}, disabled: false}],
      vector3d: [{value: {x: 15, y: 8, z: 5}, disabled: false}],
      vector4d: [{value: {x: 15, y: 8, z: 5, w: 24}, disabled: false}]
    });
  }

  log() {
    console.log('test');
  }
}
