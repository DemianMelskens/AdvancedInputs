import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberComponent} from './components/number/number.component';
import {Vector3dComponent} from "./components/vector3d/vector3d.component";
import {Vector4dComponent} from './components/vector4d/vector4d.component';
import {FormsModule} from "@angular/forms";
import {Vector2dComponent} from "./components/vector2d/vector2d.component";


@NgModule({
  declarations: [
    NumberComponent,
    Vector2dComponent,
    Vector3dComponent,
    Vector4dComponent
  ],
  exports: [
    NumberComponent,
    Vector2dComponent,
    Vector3dComponent,
    Vector4dComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class InputsModule {
}
